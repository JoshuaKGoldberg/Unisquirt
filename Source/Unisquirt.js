// @echo '/// <reference path="GameStartr-0.2.0.ts" />'
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// @ifdef INCLUDE_DEFINITIONS
/// <reference path="References/GameStartr-0.2.0.ts" />
/// <reference path="Unisquirt.d.ts" />
// @endif
// @include ../Source/Unisquirt.d.ts
/**
 * You're a rainbow-pooping unicorn. How long can you last?
 */
var Unisquirt;
(function (Unisquirt_1) {
    "use strict";
    /**
     * GameStartr implementation for Unisquirt.
     */
    var Unisquirt = (function (_super) {
        __extends(Unisquirt, _super);
        /**
         * Initializes a new instance of the Unisquirt class.
         *
         * @param settings   Settings to be used for initialization.
         */
        function Unisquirt(settings) {
            this.settings = Unisquirt.settings;
            _super.call(this, this.proliferate({
                "constantsSource": Unisquirt,
                "constants": ["unitsize", "scale"]
            }, settings));
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
        Unisquirt.prototype.resetObjectMaker = function (Unisquirter, settings) {
            Unisquirter.ObjectMaker = new ObjectMakr.ObjectMakr(Unisquirter.proliferate({
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
            }, Unisquirter.settings.objects));
        };
        /**
         * Sets this.container via the parent GameStartr resetContainer, then tells
         * the PixelDrawer which Thing groups are to be drawn.
         *
         * @param Unisquirter   The Unisquirter being reset.
         * @param settings   Any additional settings to pass to super.resetContainer.
         */
        Unisquirt.prototype.resetContainer = function (Unisquirter, settings) {
            _super.prototype.resetContainer.call(this, Unisquirter, settings);
            Unisquirter.PixelDrawer.setThingArrays([
                Unisquirter.GroupHolder.getGroup("Scenery"),
                Unisquirter.GroupHolder.getGroup("Solid"),
                Unisquirter.GroupHolder.getGroup("Character"),
                Unisquirter.GroupHolder.getGroup("Text"),
                Unisquirter.GroupHolder.getGroup("Particle")
            ]);
        };
        /* Global manipulations
        */
        /**
         * Completely restarts the game.
         */
        Unisquirt.prototype.gameStart = function () {
            this.PixelDrawer.setBackground(this.createNightGradient());
            this.setMap();
        };
        /**
         * Slight addition to the GameStartr thingProcess Function. The Thing's hit
         * check type is cached immediately.
         */
        Unisquirt.prototype.thingProcess = function (thing, title, settings, defaults) {
            _super.prototype.thingProcess.call(this, thing, title, settings, defaults);
            // ThingHittr becomes very non-performant if Functions aren't generated
            // for each Thing constructor (optimization does not respect prototypal 
            // inheritance, sadly).
            thing.GameStarter.ThingHitter.cacheHitCheckType(thing.title, thing.groupType);
        };
        /**
         * Adds a Thing via addPreThing based on the specifications in a PreThing.
         * This is done relative to MapScreener.left and MapScreener.top.
         *
         * @param prething
         */
        Unisquirt.prototype.addPreThing = function (prething) {
            var thing = prething.thing;
            thing.GameStarter.addThing(thing, prething.left * thing.GameStarter.unitsize - thing.GameStarter.MapScreener.left, prething.top * thing.GameStarter.unitsize - thing.GameStarter.MapScreener.top);
        };
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
        Unisquirt.prototype.maintainMoving = function (fps) {
            var thingGroups = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                thingGroups[_i - 1] = arguments[_i];
            }
            var fpsRatio = isNaN(fps) ? 1 : 60 / fps, things, thing, i, j;
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
        };
        /* Spawning
        */
        /**
         * Spawn Function for a Star. It's given a random y-velocity updward and
         * animated to flicker at a random speed.
         *
         * @param thing   The Star being spawned.
         */
        Unisquirt.prototype.spawnStar = function (thing) {
            thing.yvel = thing.Unisquirter.NumberMaker.randomWithin(-.117, -.007);
            thing.Unisquirter.TimeHandler.addClassCycle(thing, ["one", "two", "three"], "shimmer", thing.Unisquirter.NumberMaker.randomIntWithin(49, 84));
        };
        /* Movement
        */
        /**
         * Movement Function for a Star. If it's above the screen, it's shifted to below.
         *
         * @param thing   The Star in play.
         */
        Unisquirt.prototype.moveStar = function (thing) {
            if (thing.bottom <= thing.Unisquirter.MapScreener.top) {
                thing.Unisquirter.setTop(thing, thing.Unisquirter.MapScreener.bottom);
            }
        };
        /* Map sets
        */
        /**
         * Sets the game state to the "Night" map and "Sky" location, resetting all
         * Things, inputs, and other previous game state in the process.
         */
        Unisquirt.prototype.setMap = function () {
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
        };
        /**
         * Adds a new Player Thing to the game, centered horizontally and 16 in-game pixels
         * from the bottom vertically, and sets it as .player.
         *
         * @returns The newly created Thing.
         */
        Unisquirt.prototype.addPlayer = function () {
            var player = this.player = this.ObjectMaker.make("Player");
            this.addThing(player, (this.MapScreener.width - player.width * this.unitsize) / 2, this.MapScreener.height - (player.height + 16) * this.unitsize);
            return player;
        };
        /**
         * Adds a Floor Thing stretched across the bottom of the map.
         */
        Unisquirt.prototype.addFloor = function () {
            this.addThing(this.ObjectMaker.make("Floor", {
                "width": this.MapScreener.width
            }), 0, this.MapScreener.height - (16) * this.unitsize);
        };
        /**
         * Adds Star Things scattered across the sky randomly.
         */
        Unisquirt.prototype.addStars = function () {
            var distanceBetween = this.unitsize * this.MathDecider.getConstant("starDistance"), starColumns = 1 + this.MapScreener.width / distanceBetween, left, top;
            for (left = -this.NumberMaker.randomInt(starColumns); left < this.MapScreener.width; left += distanceBetween) {
                top = this.NumberMaker.randomIntWithin(this.unitsize * -7, this.MapScreener.height);
                this.addThing("Star", left, top);
            }
        };
        /* Graphics utilities
        */
        /**
         * Generates a black-blue-indigo gradient from the top-center of the screen
         * to the bottom-right for use as a PixelDrawr background.
         *
         * @returns The resultant CanvasGradient.
         */
        Unisquirt.prototype.createNightGradient = function () {
            var context = this.canvas.getContext("2d"), background = context.createLinearGradient(this.MapScreener.width / 2, 0, this.MapScreener.width, this.MapScreener.height);
            background.addColorStop(0.14, "#000000");
            background.addColorStop(0.56, "#000014");
            background.addColorStop(0.84, "#140021");
            background.addColorStop(1, "#210021");
            return background;
        };
        // For the sake of reset functions, constants are stored as members of the 
        // Unisquirt class itself - this allows prototype setters to use 
        // them regardless of whether the prototype has been instantiated yet.
        /**
         * Static settings passed to individual reset Functions. Each of these
         * should be filled out separately, after the Unisquirt class
         * has been declared but before an instance has been instantiated.
         */
        Unisquirt.settings = {
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
        Unisquirt.unitsize = 4;
        /**
         * Static scale of 4 for pixel expansion.
         */
        Unisquirt.scale = 4;
        return Unisquirt;
    })(GameStartr.GameStartr);
    Unisquirt_1.Unisquirt = Unisquirt;
})(Unisquirt || (Unisquirt = {}));
