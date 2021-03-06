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
         * The Player Thing being controlled by the user.
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

            this.AudioPlayer.playTheme("He-Man Sings");
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
                <IThing[]>Unisquirter.GroupHolder.getGroup("Particle"),
                <IThing[]>Unisquirter.GroupHolder.getGroup("Character")
            ]);

            Unisquirter.container.appendChild(Unisquirter.ItemsHolder.getContainer());
            Unisquirter.container.appendChild(Unisquirter.createElement("div", {
                "id": "instructions"
            }));
        }


        /* Global manipulations
        */

        /**
         * Completely restarts the game.
         */
        gameStart(): void {
            this.PixelDrawer.setBackground(this.createNightGradient());
            this.ItemsHolder.setItem("score", 0);
            this.ItemsHolder.setItem("numberOfJumps", 0);
            this.setMap();

            (<HTMLElement>this.container.querySelector("#instructions")).style.display = "block";
            (<HTMLElement>this.container.querySelector("#instructions")).textContent = "space to jump; left & right to move";
        }

        /**
         * Slight addition to the GameStartr thingProcess Function. The Thing's hit
         * check type is cached immediately.
         */
        thingProcess(thing: IThing, title: string, settings: any, defaults: any): void {
            super.thingProcess(thing, title, settings, defaults);

            thing.GameStarter.ThingHitter.cacheChecksForType(thing.title, thing.groupType);
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


        /* Input
        */

        /**
         * Reacts to the left key being pressed. The player's left key is marked as down,
         * and its sprite is set to face the left if it isn't already.
         * 
         * @param Unisquirter   The governing Unisquirt.
         */
        keyDownLeft(Unisquirter: Unisquirt): void {
            if (Unisquirter.GamesRunner.getPaused() || !Unisquirter.player.alive) {
                return;
            }

            var player: IPlayer = Unisquirter.player;

            player.keys.left = true;
            player.keys.right = false;
            if (!player.flipHoriz) {
                Unisquirter.flipHoriz(player);
            }
        }

        /**
         * Reacts to the right key being pressed. The player's right key is marked as down,
         * and its sprite is set to face the right if it isn't already.
         * 
         * @param Unisquirter   The governing Unisquirt.
         */
        keyDownRight(Unisquirter: Unisquirt): void {
            if (Unisquirter.GamesRunner.getPaused() || !Unisquirter.player.alive) {
                return;
            }

            var player: IPlayer = Unisquirter.player;

            player.keys.right = true;
            player.keys.left = false;
            if (player.flipHoriz) {
                Unisquirter.unflipHoriz(player);
            }
        }

        /**
         * Reacts to the space key being pressed. The player's space key is marked as down,
         * and it's animated to jump up and forward.
         * 
         * @param Unisquirter   The governing Unisquirt.
         */
        keyDownSpace(Unisquirter: Unisquirt): void {
            if (Unisquirter.GamesRunner.getPaused()) {
                return;
            }

            var player: IPlayer = Unisquirter.player;

            if (!player.alive) {
                Unisquirter.gameStart();
                return;
            }

            if (!player.canJump || player.keys.jump) {
                return;
            }

            player.canJump = false;
            player.keys.jump = true;
            Unisquirter.TimeHandler.addEvent(
                (): void => {
                    player.canJump = true;
                },
                21);

            player.xvel += Unisquirter.unitsize * 3.5 * (player.flipHoriz ? -1 : 1);
            player.yvel = -Unisquirter.unitsize * 3.5;

            if (player.resting) {
                player.xvel += Unisquirter.unitsize * 1.4 * (player.flipHoriz ? -1 : 1);
                player.yvel -= Unisquirter.unitsize * 0.7;
            }

            Unisquirter.animatePlayerStartRunning(player);
            Unisquirter.addCloudsBehindPlayer(player);
            Unisquirter.ItemsHolder.increase("numberOfJumps");

            (<HTMLElement>Unisquirter.container.querySelector("#instructions")).style.display = "none";
        }

        /**
         * Reacts to the left key being raised. The player's left key is marked as up.
         * 
         * @param Unisquirter   The governing Unisquirt.
         */
        keyUpLeft(Unisquirter: Unisquirt): void {
            Unisquirter.player.keys.left = false;
        }

        /**
         * Reacts to the left key being raised. The player's left key is marked as up.
         * 
         * @param Unisquirter   The governing Unisquirt.
         */
        keyUpRight(Unisquirter: Unisquirt): void {
            Unisquirter.player.keys.right = false;
        }

        /**
         * Reacts to the right key being raised. The player's right key is marked as up.
         * 
         * @param Unisquirter   The governing Unisquirt.
         */
        keyUpSpace(Unisquirter: Unisquirt, event?: Event): void {
            Unisquirter.player.keys.jump = false;
        }


        /* Upkeep maintenence
        */

        /**
         * Maintenance Function for any number of Thing groups. Each Thing with a
         * movement Function has it called. Velocities are applied.
         * 
         * @param thingGroups   Any number of Thing groups.
         */
        maintainMoving(...thingGroups: IThing[][]): void {
            var things: IThing[],
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

                    this.shiftHoriz(thing, thing.xvel || 0);
                    this.shiftVert(thing, thing.yvel || 0);
                }
            }
        }

        /**
         * Maintenance Function for the player. Air friction and gravity are applied,
         * as well as resting checks.
         * 
         * @param player   A Unisquirt's player.
         */
        maintainPlayer(player: IPlayer): void {
            if (!player.alive) {
                return;
            }

            // Horizontal slowdown
            if (Math.abs(player.xvel) > this.unitsize / 4) {
                if (player.resting) {
                    player.xvel *= 0.7;
                } else {
                    player.xvel *= 0.96;
                }
            } else {
                player.xvel = 0;
                player.Unisquirter.animatePlayerStopRunning(player);
            }

            // Key speed-ups, if on the ground
            if (player.resting) {
                if (player.keys.right) {
                    player.xvel += player.Unisquirter.unitsize / 1.17;
                } else if (player.keys.left) {
                    player.xvel -= player.Unisquirter.unitsize / 1.17;
                }
            }

            // Resting && running re-check
            if (player.resting) {
                if (!player.Unisquirter.ThingHitter.checkHitForThings(player, player.resting)) {
                    player.resting = undefined;
                } else if (player.xvel !== 0 && (!player.cycles || !player.cycles.running)) {
                    player.Unisquirter.animatePlayerStartRunning(player);
                }
            }

            // Vertical falling
            if (!player.resting && player.yvel < this.unitsize * 3.5) {
                player.yvel += this.unitsize / 7;
            }

            // Top map boundary
            if (player.yvel < 0) {
                if (player.bottom < player.Unisquirter.MapScreener.top) {
                    player.yvel = 0;
                } else if (player.top < player.Unisquirter.MapScreener.top) {
                    player.yvel *= .84;
                }
            }

            // Map sides overflow
            this.checkPlayerSidesOverflow(player);

            // Rainbow spawning
            if (player.xvel !== 0 && player.yvel !== 0) {
                this.addRainbowBehindPlayer(player);
            }

            // Collisions
            this.ThingHitter.checkHitsForThing(player);
            if (player.shadow) {
                this.ThingHitter.checkHitsForThing(player.shadow);
            }
        }

        /**
         * Determines whether the Player is overlapping the sides of the screen.
         * If it is, a shadow is ensured to exist, and positioned.
         * If it isn't, a shadow is ensured to not exist.
         * 
         * @param player   A Player that may be overlapping the sides of the screen.
         */
        checkPlayerSidesOverflow(player: IPlayer): void {
            if (player.left > this.MapScreener.left && player.right < this.MapScreener.right) {
                if (player.shadow) {
                    this.killPlayerShadow(player.shadow);
                }

                return;
            }

            if (!player.shadow) {
                player.shadow = <IPlayer>this.addThing("PlayerShadow");
            }

            this.setTop(player.shadow, player.top);

            if (player.right > this.MapScreener.right) {
                this.setRight(player.shadow, player.right - this.MapScreener.right);
                if (player.left > this.MapScreener.right) {
                    this.killPlayerShadow(player.shadow, true);
                }
            } else {
                this.setLeft(player.shadow, this.MapScreener.right - (this.MapScreener.left - player.left));
                if (player.right < this.MapScreener.left) {
                    this.killPlayerShadow(player.shadow, true);
                }
            }
        }


        /* Collision detection
        */

        /**
         * Function generator for the generic canThingCollide checker. This is used
         * repeatedly by ThingHittr to generate separately optimized Functions for
         * different Thing types.
         * 
         * @returns A Function that determines if a Thing may have its hits checked.
         */
        generateCanThingCollide(): ThingHittr.IGlobalCheck {
            /**
             * Generic checker for whether a Thing may have its hits checked.
             * 
             * @param Thing   A Thing that might need to have hits checked.
             * @returns Whether the Thing may have its hits checked.
             */
            return function canThingCollide(thing: IThing): boolean {
                return thing.alive && !thing.nocollide;
            };
        }

        /**
         * Function generator for the generic isCharacterTouchingSolid checker. This
         * is used repeately by the ThingHittr to generate separately optimized Functions
         * for different Thing types.
         * 
         * @returns A Function that determines if a Character and Solid are hitting, which
         *          is defined as the Character landing on the Solid.
         */
        generateIsCharacterTouchingSolid(): ThingHittr.IHitCheck {
            /**
             * Generic checker for whether a Character is landing on a Solid.
             * 
             * @param thing   A Character that may be landing on other.
             * @param other   A Solid that thing may be landing on.
             */
            return function isCharacterTouchingSolid(thing: ICharacter, other: IThing): boolean {
                return (
                    !thing.nocollide && !other.nocollide
                    && thing.left <= other.right
                    && thing.right >= other.left
                    && other.top - thing.bottom < thing.Unisquirter.unitsize * 2);
            };
        }

        /**
         * Function generator for the generic isCharacterTouchingCharacter checker. 
         * This is used repeately by the ThingHittr to generate separately optimized 
         * Functions for different Thing types.
         * 
         * @returns A Function that determines if a Character and Character are hitting.
         */
        generateIsCharacterTouchingParticle(): ThingHittr.IHitCheck {
            /**
             * Generic checker for whether a Character is hitting a Solid.
             * 
             * @param thing   A Character that may be hitting other.
             * @param other   A Character that may be hitting thing.
             */
            return function isCharacterTouchingCharacter(thing: ICharacter, other: ICharacter): boolean {
                return (
                    !thing.nocollide && !other.nocollide
                    && thing.right - thing.Unisquirter.unitsize > other.left
                    && thing.left + thing.Unisquirter.unitsize < other.right
                    && thing.bottom >= other.top
                    && thing.top <= other.bottom);
            };
        }

        /**
         * Function generator for the generic hitCharacterSolid callback. This is 
         * used repeatedly by ThingHittr to generate separately optimized Functions
         * for different Thing types.
         * 
         * @returns A Function for when a Character hits a Solid.
         */
        generateHitCharacterSolid(): ThingHittr.IHitCallback {
            /**
             * A callback for when a Character hits a Solid.
             * 
             * @param thing   A Character hitting other.
             * @param other   A solid being hit by thing.
             */
            return function hitCharacterSolid(thing: IPlayer, other: IThing): void {
                thing.resting = other;
                thing.Unisquirter.setBottom(thing, other.top);

                if (thing.player) {
                    thing.Unisquirter.ItemsHolder.setItem("numberOfJumps", 0);
                }
            };
        }

        /**
         * Function generator for the generic hitCharacterCharacter callback. This is 
         * used repeatedly by ThingHittr to generate separately optimized Functions
         * for different Thing types.
         * 
         * @returns A Function for when a Character hits a Character.
         */
        generateHitCharacterParticle(): ThingHittr.IHitCallback {
            /**
             * A callback for when a Character hits a Character. If one is a Player (either
             * the primary one or its shadow), the primary Player is killed.
             * 
             * @param thing   A Character hitting other.
             * @param other   A Solid being hit by thing.
             */
            return function hitCharacterCharacter(thing: ICharacter, other: ICharacter): void {
                if (thing.player) {
                    thing.Unisquirter.animateCloudBlowingUp(other);
                } else if (other.player) {
                    thing.Unisquirter.animateCloudBlowingUp(thing);
                } else {
                    return;
                }

                thing.Unisquirter.killPlayer(thing.Unisquirter.player);
            };
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
            thing.yvel = thing.Unisquirter.NumberMaker.randomWithin(-.21, -.007);

            thing.Unisquirter.TimeHandler.addClassCycle(
                thing,
                ["one", "two", "three"],
                "shimmer",
                thing.Unisquirter.NumberMaker.randomIntWithin(49, 84));

            thing.Unisquirter.addClass(
                thing,
                thing.Unisquirter.NumberMaker.randomArrayMember(["one", "two", "three"]));
        }

        /**
         * Spawn Function for a Cloud. It immediately starts fading out and floating
         * upwards, and is killed when it's completely faded.
         * 
         * @param thing   The Cloud being spawned.
         */
        spawnCloud(thing: ICloud): void {
            if (thing.noSpawn) {
                return;
            }

            var yvel: number = -thing.Unisquirter.unitsize / 7,
                isFading: boolean = false;

            thing.nocollide = true;
            thing.opacity = thing.Unisquirter.NumberMaker.randomWithin(.7, .98);

            thing.Unisquirter.TimeHandler.addEventInterval(
                (): void => {
                    thing.nocollide = false;
                },
                14);

            thing.Unisquirter.TimeHandler.addEventInterval(
                (): void => {
                    isFading = true;
                },
                117);


            thing.Unisquirter.TimeHandler.addEventInterval(
                (): boolean => {
                    if (isFading) {
                        thing.opacity -= .014;
                        if (thing.opacity <= .21) {
                            thing.nocollide = true;
                        }

                        if (thing.opacity <= .07) {
                            thing.Unisquirter.killNormal(thing);
                            return true;
                        }
                    }

                    if (thing.xvel) {
                        thing.xvel *= .91;

                        if (Math.abs(thing.xvel) < thing.Unisquirter.unitsize / 8) {
                            thing.xvel = 0;
                        }
                    }

                    thing.Unisquirter.shiftVert(thing, yvel);
                    yvel *= .99;
                    return false;
                },
                1,
                Infinity);
        }

        /**
         * Spawn Function for a Rainbow. It immediately starts fading out, and is
         * killed when it's completely faded.
         * 
         * @param thing   The Rainbow being spawned.
         */
        spawnRainbow(thing: IThing): void {
            thing.Unisquirter.TimeHandler.addEventInterval(
                (): boolean => {
                    thing.opacity -= .1;

                    if (thing.opacity <= 0) {
                        thing.Unisquirter.killNormal(thing);
                        return true;
                    }

                    return false;
                },
                1,
                Infinity);
        }

        /**
         * Spawn Function for a Text. It immediately stars fading out and floating
         * upwards, and is killed when it's completely faded.
         * 
         * @param thing   The Text being spawned.
         */
        spawnText(thing: IThing): void {
            thing.Unisquirter.TimeHandler.addEventInterval(
                (): boolean => {
                    thing.Unisquirter.shiftVert(thing, -thing.Unisquirter.unitsize / 2);
                    return thing.opacity <= 0;
                },
                1,
                Infinity);

            thing.Unisquirter.TimeHandler.addEvent(
                (): void => {
                    thing.Unisquirter.TimeHandler.addEventInterval(
                        (): boolean => {
                            thing.opacity -= .07;
                            return thing.opacity <= 0;
                        },
                        1,
                        Infinity);
                },
                14);
        }

        /**
         * Spawn Function for a PlayerShadow. It's consistently kept at the same class
         * as the actual Player.
         * 
         * @param thing   The PlayerShadow being spawned.
         */
        spawnPlayerShadow(thing: IPlayer): void {
            thing.Unisquirter.TimeHandler.addEventInterval(
                (): boolean => {
                    if (!thing.alive) {
                        return true;
                    }

                    thing.Unisquirter.setClass(thing, thing.Unisquirter.player.className);
                    return false;
                },
                1,
                Infinity);
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


        /* Animations
        */

        /**
         * Animation Function for a Player starting to run. The "running" cycle is 
         * added along with the class.
         * 
         * @param player   The Player starting to run.
         */
        animatePlayerStartRunning(player: IPlayer): void {
            if (player.cycles && player.cycles.running) {
                return;
            }

            player.Unisquirter.TimeHandler.addClassCycle(
                player,
                ["one", "two", "three", "four", "five", "six"],
                "running",
                4);
            player.Unisquirter.addClass(player, "running");
        }

        /**
         * Animation Function for a player stopping running. The "running" cycle is
         * removed along with the class.
         * 
         * @param player   The Player stopping running.
         */
        animatePlayerStopRunning(player: IPlayer): void {
            player.Unisquirter.removeClasses(player, "running");
            player.Unisquirter.TimeHandler.cancelClassCycle(player, "running");
        }

        /**
         * Animation Function for a Cloud blowing up. A replacement is put on the same
         * place as the original, and timed to expand and fade away.
         * 
         * @param thing   The Cloud blowing up.
         */
        animateCloudBlowingUp(thing: ICloud): void {
            var replacement: IThing = thing.Unisquirter.ObjectMaker.make("Cloud", {
                "noSpawn": true
            });

            thing.Unisquirter.addThing(replacement, thing.left, thing.top);
            thing.Unisquirter.killNormal(thing);

            thing.Unisquirter.TimeHandler.addEventInterval(
                (): boolean => {
                    replacement.scale += .07;
                    replacement.scale *= 1.014;
                    thing.Unisquirter.setLeft(
                        replacement,
                        thing.left - replacement.width * (replacement.scale - 1) * this.unitsize / 2);
                    thing.Unisquirter.setTop(
                        replacement,
                        thing.top - replacement.height * (replacement.scale - 1) * this.unitsize / 2);
                    return replacement.opacity <= 0;
                },
                1,
                Infinity);

            thing.Unisquirter.TimeHandler.addEvent(
                (): void => {
                    thing.Unisquirter.TimeHandler.addEventInterval(
                        (): boolean => {
                            replacement.opacity -= .15;
                            return replacement.opacity <= 0;
                        },
                        1,
                        Infinity);
                },
                28);

            thing.Unisquirter.animateBloodEffects(thing);
        }

        /**
         * Animation Function for bloods spurting from a Cloud hitting a Player.
         * A random number of Blood Things, in proportion to the number of jumps, are 
         * spawned and animated with random velocities, scales, and opacities.
         * 
         * @param thing   The Cloud that just hit a Player.
         */
        animateBloodEffects(thing: IThing): void {
            var midX: number = thing.Unisquirter.getMidX(thing),
                midY: number = thing.Unisquirter.getMidY(thing),
                opacity: number = 1,
                bloods: IThing[] = [],
                settings: any = {},
                blood: IThing,
                i: number;

            for (i = 7 * thing.Unisquirter.ItemsHolder.getItem("numberOfJumps"); i >= 0; i -= 1) {
                settings.opacity = thing.Unisquirter.NumberMaker.randomWithin(0.7, 1);
                settings.scale = thing.Unisquirter.NumberMaker.randomWithin(0.35, 2.1);
                settings.xvel = thing.Unisquirter.NumberMaker.randomWithin(-0.7, 0.7) * thing.Unisquirter.unitsize;
                settings.yvel = thing.Unisquirter.NumberMaker.randomWithin(0.35, -1.75) * thing.Unisquirter.unitsize;

                blood = thing.Unisquirter.ObjectMaker.make("Blood", settings);
                bloods.push(blood);
                thing.Unisquirter.addThing(blood, midX, midY);
            }

            thing.Unisquirter.TimeHandler.addEventInterval(
                (): boolean => {
                    opacity -= .021;

                    for (i = 0; i < bloods.length; i += 1) {
                        bloods[i].opacity = opacity;
                        bloods[i].yvel += this.unitsize / 35;
                    }

                    return opacity <= 0;

                },
                1,
                Infinity);
        }

        /**
         * Animation Function for points appearing above a jump. Text Things are added
         * in a horizontal line and timed to float upwards and fade away.
         * 
         * @param player   The Player to have text appear above.
         * @param gained   How many points were gained.
         */
        animateScorePoints(player: IPlayer, gained: number | string): void {
            var text: string = gained.toString(),
                things: IThing[] = [],
                padding: number = this.MathDecider.getConstant("textPadding"),
                totalWidth: number = -padding,
                top: number = player.top,
                left: number,
                thing: IThing,
                i: number;

            for (i = 0; i < text.length; i += 1) {
                thing = this.ObjectMaker.make("Char" + text[i]);
                totalWidth += (thing.width + padding) * this.unitsize;
                things.push(thing);
            }

            left = this.getMidX(player) - totalWidth / 2;

            for (i = 0; i < things.length; i += 1) {
                this.addThing(things[i], left, top);
                left += (things[i].width + padding) * this.unitsize;
            }
        }


        /* Actions
        */

        /**
         * Adds a random number of Clouds just behind a Player, and increases the score.
         * 
         * @param player   A Player emitting Clouds.
         */
        addCloudsBehindPlayer(player: IPlayer): void {
            for (var i: number = this.MathDecider.compute("numberOfClouds", this.ItemsHolder.getItem("numberOfJumps")); i > 0; i -= 1) {
                this.addCloudBehindPlayer(player, i / 3);
            }

            var score: number = this.ItemsHolder.getItem("score"),
                gained: number = this.MathDecider.compute("pointIncrease", this.ItemsHolder.getItem("numberOfJumps"));

            score += gained;
            this.ItemsHolder.setItem("score", score);

            if (score > this.ItemsHolder.getItem("record")) {
                this.ItemsHolder.setItem("record", score);
                this.ItemsHolder.saveItem("record");
            }

            this.animateScorePoints(player, gained);
        }

        /**
         * Adds a Cloud just behind a Player, based on where the Player is facing.
         * 
         * @param player   A Player emitting a Cloud.
         * @param chaos   A multiplier for cloud velocities.
         * @returns The newly created Cloud.
         */
        addCloudBehindPlayer(player: IPlayer, chaos: number): IThing {
            var cloud: ICloud = this.ObjectMaker.make("Cloud", {
                "xvel": player.xvel * -.35
            });

            this.addThingBehindPlayerGeneral(player, cloud);

            this.shiftHoriz(cloud, this.NumberMaker.randomWithin(-this.unitsize * 3, this.unitsize * 3));
            this.shiftVert(cloud, this.NumberMaker.randomWithin(-this.unitsize, this.unitsize));

            cloud.xvel += this.NumberMaker.randomWithin(-this.unitsize * chaos / 3, this.unitsize * chaos / 3);
            cloud.yvel += this.NumberMaker.randomWithin(-this.unitsize * chaos / 14, this.unitsize * chaos / 14);
            cloud.yvel += player.yvel / 10;

            return cloud;
        }

        /**
         * Adds a set of Rainbows just behind a Player, based on where the Player is facing.
         * 
         * @param player   A Player emitting Rainbows.
         */
        addRainbowBehindPlayer(player: IPlayer): void {
            var position: [number, number] = this.getPlayerBehindPosition(player, this.ObjectMaker.make("Rainbow")),
                direction: number = player.flipHoriz ? 1 : -1,
                dx: number = Math.max(Math.abs(player.xvel), 1),
                i: number;

            for (i = 0; i < dx; i += 1) {
                this.addThing("Rainbow", position[0] + i * direction, position[1]);
            }
        }

        /**
         * Adds a Thing just behind a Player, based on where the Player is facing.
         * 
         * @param player   A Player emitting some Thing.
         * @param thing   The Thing being emitted.
         */
        addThingBehindPlayerGeneral(player: IPlayer, thing: IThing): void {
            var position: [number, number] = this.getPlayerBehindPosition(player, thing);

            this.addThing(thing, position[0] - thing.width * this.unitsize / 2, position[1]);
        }

        /**
         * Determines the optimal location to place a Thing at a Player's buttocks.
         * 
         * @param player   The Player whose buttocks shall be placed upon.
         * @param thing   The Thing being placed on and/or in the Player's buttocks.
         * @returns The [left, top] position of the Player's buttocks' peak point.
         */
        getPlayerBehindPosition(player: IPlayer, thing: IThing): [number, number] {
            var referenceThing: IThing = player,
                left: number,
                top: number;

            // If the Player has a shadow and the shadow's rear is visible,
            // that becomes the position reference
            if (player.shadow) {
                if (player.flipHoriz) {
                    if (player.right > this.MapScreener.right) {
                        referenceThing = player.shadow;
                    }
                } else {
                    if (player.left < this.MapScreener.left) {
                        referenceThing = player.shadow;
                    }
                }
            }

            if (player.flipHoriz) {
                left = referenceThing.right - this.unitsize / 2;
                left -= (thing.width + 11) * this.unitsize / 2;
            } else {
                left = referenceThing.left + this.unitsize / 2;
                left += (thing.width + 10) * this.unitsize / 2;
            }

            top = referenceThing.top + 13 * this.unitsize;

            return [left, top];
        }


        /* Deaths
        */

        /**
         * Kills a Player by freezing its cycles, flipping and fading it, removing any
         * existing shadow, and setting the help text.
         * 
         * @param player   The Player being killed.
         */
        killPlayer(player: IPlayer): void {
            var dy: number = -2.8;

            player.alive = false;
            player.nocollide = true;
            player.xvel = 0;
            player.yvel = 0;

            this.TimeHandler.cancelClassCycle(player, "running");
            this.addClasses(player, "running", "two");
            this.flipVert(player);

            this.TimeHandler.addEventInterval(
                (): boolean => {
                    this.shiftVert(player, this.unitsize * dy);
                    dy += .1;
                    return player.opacity <= 0;
                },
                1,
                Infinity);

            this.TimeHandler.addEventInterval(
                (): boolean => {
                    player.opacity -= .015;
                    return player.opacity <= 0;
                },
                1,
                Infinity);

            if (player.shadow) {
                this.killPlayer(player.shadow);
            }

            (<HTMLElement>this.container.querySelector("#instructions")).style.display = "block";
            (<HTMLElement>this.container.querySelector("#instructions")).textContent = "space to go again";
        }

        /**
         * Kills a Player's shadow and unlists it from its Player.
         * 
         * @param player   The PlayerShadow being killed.
         * @param replaceWithPlayer   Whether the Player should be moved to the shadow's
         *                            previous position (by default, false).
         */
        killPlayerShadow(thing: IPlayer, replaceWithPlayer?: boolean): void {
            this.killNormal(thing);
            thing.Unisquirter.player.shadow = undefined;

            if (replaceWithPlayer) {
                this.setLeft(thing.Unisquirter.player, thing.left);
                this.setTop(thing.Unisquirter.player, thing.top);
            }
        }


        /* Map sets
        */

        /**
         * Sets the game state to the "Night" map and "Sky" location, resetting all 
         * Things, inputs, and other previous game state in the process.
         */
        setMap(): void {
            this.GroupHolder.clearArrays();
            this.InputWriter.restartHistory();
            this.MapScreener.clearScreen();
            this.TimeHandler.cancelAllEvents();

            this.MapsHandler.setMap("Night", "Sky");

            this.MapScreener.setVariables();
            this.QuadsKeeper.resetQuadrants();

            this.addPlayer();
            this.addFloor();
            this.addStars();

            this.GamesRunner.play();
        }

        /**
         * Adds a new Player Thing to the game, centered horizontally and 16 in-game pixels
         * from the bottom vertically, and sets it as .player.
         * 
         * @returns The newly created Thing.
         */
        addPlayer(): IPlayer {
            var player: IPlayer = this.player = <IPlayer>this.ObjectMaker.make("Player", {
                "keys": {
                    "direction": 0
                }
            });

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
                        "width": this.MapScreener.width * 1.1
                    }),
                this.MapScreener.width * -.1,
                this.MapScreener.height - 16 * this.unitsize);
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
                background: CanvasGradient = context.createLinearGradient(
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
