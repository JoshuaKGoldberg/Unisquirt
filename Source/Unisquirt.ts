﻿// @echo '/// <reference path="GameStartr-0.2.0.ts" />'

// @ifdef INCLUDE_DEFINITIONS
/// <reference path="References/GameStartr-0.2.0.ts" />
/// <reference path="Unisquirt.d.ts" />
// @endif

// @include ../Source/Unisquirt.d.ts

/**
 * You're a rainbow-pooping unicorn. How long can you last?
 */
module Unisquirt {
    "use strict";

    /**
     * GameStartr implementation for Unisquirt.
     */
    export class Unisquirt extends GameStartr.GameStartr implements IUnisquirt {
        // For the sake of reset functions, constants are stored as members of the 
        // Unisquirt class itself - this allows prototype setters to use 
        // them regardless of whether the prototype has been instantiated yet.

        /**
         * Static settings passed to individual reset Functions. Each of these
         * should be filled out separately, after the Unisquirt class
         * has been declared but before an instance has been instantiated.
         */
        public static settings: GameStartr.IGameStartrStoredSettings = {
            "audio": undefined,
            "collisions": undefined,
            "devices": undefined,
            "editor": undefined,
            "generator": undefined,
            "groups": undefined,
            "events": undefined,
            "input": undefined,
            "math": undefined,
            "maps": undefined,
            "mods": undefined,
            "objects": undefined,
            "quadrants": undefined,
            "renderer": undefined,
            "runner": undefined,
            "scenes": undefined,
            "sprites": undefined,
            "statistics": undefined,
            "touch": undefined,
            "ui": undefined
        };

        /**
         * Static unitsize of 4 for Thing sizes.
         */
        public static unitsize: number = 4;

        /**
         * Static scale of 4 for pixel expansion.
         */
        public static scale: number = 4;

        /**
         * Internal reference to the static unitsize.
         */
        public unitsize: number;

        /**
         * Internal reference to the static settings.
         */
        public settings: GameStartr.IGameStartrStoredSettings;

        /**
         * The Thing being controlled by the user.
         */
        public player: IPlayer;

        /**
         * Initializes a new instance of the Unisquirt class.
         * 
         * @param settings   Settings to be used for initialization.
         */
        constructor(settings: GameStartr.IGameStartrSettings) {
            this.settings = Unisquirt.settings;

            super(
                this.proliferate(
                    {
                        "constantsSource": Unisquirt,
                        "constants": ["unitsize", "scale"]
                    },
                    settings));
        }


        /* Resets
        */

        /**
         * Sets this.ObjectMaker.
         * 
         * Because many Thing functions require access to other Unisquirt modules, each is
         * given a reference to this container Unisquirt via properties.thing.Unisquirt. 
         * 
         * @param Unisquirter   The Unisquirt being reset.
         * @param settings   Static reset settings being passed to all reset Functions.
         */
        resetObjectMaker(Unisquirter: Unisquirt, settings: GameStartr.IGameStartrSettings): void {
            Unisquirter.ObjectMaker = new ObjectMakr.ObjectMakr(
                Unisquirter.proliferate(
                    {
                        "properties": {
                            "Quadrant": {
                                "EightBitter": Unisquirter,
                                "GameStarter": Unisquirter,
                                "Unisquirter": Unisquirter
                            },
                            "Thing": {
                                "EightBitter": Unisquirter,
                                "GameStarter": Unisquirter,
                                "Unisquirter": Unisquirter
                            }
                        }
                    },
                    Unisquirter.settings.objects));
        }

        /**
         * Sets this.container via the parent GameStartr resetContainer, then tells
         * the PixelDrawer which Thing groups are to be drawn.
         * 
         * @param Unisquirter   The Unisquirter being reset.
         * @param settings   Any additional settings to pass to super.resetContainer.
         */
        resetContainer(Unisquirter: Unisquirt, settings: GameStartr.IGameStartrSettings): void {
            super.resetContainer(Unisquirter, settings);

            Unisquirter.PixelDrawer.setThingArrays([
                <IThing[]>Unisquirter.GroupHolder.getGroup("Scenery"),
                <IThing[]>Unisquirter.GroupHolder.getGroup("Solid"),
                <IThing[]>Unisquirter.GroupHolder.getGroup("Character"),
                <IThing[]>Unisquirter.GroupHolder.getGroup("Text"),
                <IThing[]>Unisquirter.GroupHolder.getGroup("Particle")
            ]);
        }


        /* Global manipulations
        */

        /**
         * Completely restarts the game.
         */
        gameStart(): void {
            this.PixelDrawer.setBackground(this.createNightGradient());
            this.setMap();
        }

        /**
         * Slight addition to the GameStartr thingProcess Function. The Thing's hit
         * check type is cached immediately.
         */
        thingProcess(thing: IThing, title: string, settings: any, defaults: any): void {
            super.thingProcess(thing, title, settings, defaults);

            // ThingHittr becomes very non-performant if Functions aren't generated
            // for each Thing constructor (optimization does not respect prototypal 
            // inheritance, sadly).
            thing.GameStarter.ThingHitter.cacheHitCheckType(thing.title, thing.groupType);
        }

        /**
         * Adds a Thing via addPreThing based on the specifications in a PreThing.
         * This is done relative to MapScreener.left and MapScreener.top.
         * 
         * @param prething
         */
        addPreThing(prething: MapsCreatr.IPreThing): void {
            var thing: IThing = <IThing>prething.thing;

            thing.GameStarter.addThing(
                thing,
                prething.left * thing.GameStarter.unitsize - thing.GameStarter.MapScreener.left,
                prething.top * thing.GameStarter.unitsize - thing.GameStarter.MapScreener.top);
        }


        /* Upkeep maintenence
        */

        /**
         * Maintenance Function for any number of Thing groups. Each Thing with a
         * movement Function has it called. Velocities are applied accounting for
         * the approximate game frames per second.
         * 
         * @param fps   The current estimated frames per second.
         * @param thingGroups   Any number of Thing groups.
         */
        maintainMoving(fps: number, ...thingGroups: IThing[][]): void {
            var fpsRatio: number = isNaN(fps) ? 1 : 60 / fps,
                things: IThing[],
                thing: IThing,
                i: number,
                j: number;

            for (i = 0; i < thingGroups.length; i += 1) {
                things = thingGroups[i];
                if (!things.length) {
                    continue;
                }

                for (j = 0; j < things.length; j += 1) {
                    thing = things[j];
                    if (thing.movement) {
                        thing.movement(thing);
                    }

                    thing.Unisquirter.shiftHoriz(thing, (thing.xvel || 0) * fpsRatio);
                    thing.Unisquirter.shiftVert(thing, (thing.yvel || 0) * fpsRatio);
                }
            }
        }


        /* Spawning
        */

        /**
         * Spawn Function for a Star. It's given a random y-velocity updward and 
         * animated to flicker at a random speed.
         * 
         * @param thing   The Star being spawned.
         */
        spawnStar(thing: IThing): void {
            thing.yvel = thing.Unisquirter.NumberMaker.randomWithin(-.117, -.007);
            thing.Unisquirter.TimeHandler.addClassCycle(
                thing,
                ["one", "two", "three"],
                "shimmer",
                thing.Unisquirter.NumberMaker.randomIntWithin(49, 84));
        }


        /* Movement
        */

        /**
         * Movement Function for a Star. If it's above the screen, it's shifted to below.
         * 
         * @param thing   The Star in play.
         */
        moveStar(thing: IThing): void {
            if (thing.bottom <= thing.Unisquirter.MapScreener.top) {
                thing.Unisquirter.setTop(thing, thing.Unisquirter.MapScreener.bottom);
            }
        }


        /* Map sets
        */

        /**
         * Sets the game state to the "Night" map and "Sky" location, resetting all 
         * Things, inputs, and other previous game state in the process.
         */
        setMap(): void {
            this.AudioPlayer.clearAll();
            this.GroupHolder.clearArrays();
            this.InputWriter.restartHistory();
            this.MapScreener.clearScreen();
            this.TimeHandler.cancelAllEvents();

            this.MapsHandler.setMap("Night", "Sky");

            this.MapScreener.setVariables();
            this.QuadsKeeper.resetQuadrants();

            this.GamesRunner.play();

            this.addPlayer();
            this.addFloor();
            this.addStars();
        }

        /**
         * Adds a new Player Thing to the game, centered horizontally and 16 in-game pixels
         * from the bottom vertically, and sets it as .player.
         * 
         * @returns The newly created Thing.
         */
        addPlayer(): IPlayer {
            var player: IPlayer = this.player = <IPlayer>this.ObjectMaker.make("Player");

            this.addThing(
                player,
                (this.MapScreener.width - player.width * this.unitsize) / 2,
                this.MapScreener.height - (player.height + 16) * this.unitsize);

            return player;
        }

        /**
         * Adds a Floor Thing stretched across the bottom of the map.
         */
        addFloor(): void {
            this.addThing(
                this.ObjectMaker.make(
                    "Floor",
                    {
                        "width": this.MapScreener.width
                    }),
                0,
                this.MapScreener.height - (16) * this.unitsize);
        }

        /**
         * Adds Star Things scattered across the sky randomly.
         */
        addStars(): void {
            var distanceBetween: number = this.unitsize * this.MathDecider.getConstant("starDistance"),
                starColumns: number = 1 + this.MapScreener.width / distanceBetween,
                left: number,
                top: number;

            for (left = -this.NumberMaker.randomInt(starColumns); left < this.MapScreener.width; left += distanceBetween) {
                top = this.NumberMaker.randomIntWithin(this.unitsize * -7, this.MapScreener.height);

                this.addThing("Star", left, top);
            }
        }


        /* Graphics utilities
        */

        /**
         * Generates a black-blue-indigo gradient from the top-center of the screen
         * to the bottom-right for use as a PixelDrawr background.
         * 
         * @returns The resultant CanvasGradient.
         */
        createNightGradient(): CanvasGradient {
            var context: CanvasRenderingContext2D = this.canvas.getContext("2d"),
                background = context.createLinearGradient(
                    this.MapScreener.width / 2,
                    0,
                    this.MapScreener.width,
                    this.MapScreener.height);

            background.addColorStop(0.14, "#000000");
            background.addColorStop(0.56, "#000014");
            background.addColorStop(0.84, "#140021");
            background.addColorStop(1, "#210021");

            return background;
        }
    }
}
