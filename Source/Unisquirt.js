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
         * Sets this.ThingHitter.
         *
         * @param {FullScreenMario} FSM
         * @param {Object} customs
         */
        Unisquirt.prototype.resetThingHitter = function (Unisquirter, settings) {
            _super.prototype.resetThingHitter.call(this, Unisquirter, settings);
            Unisquirter.ThingHitter.cacheHitCheckGroup("Character");
            Unisquirter.ThingHitter.cacheHitCheckGroup("Particle");
            Unisquirter.ThingHitter.cacheHitCheckGroup("Solid");
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
                Unisquirter.GroupHolder.getGroup("Particle"),
                Unisquirter.GroupHolder.getGroup("Character")
            ]);
            Unisquirter.container.appendChild(Unisquirter.ItemsHolder.getContainer());
            Unisquirter.container.appendChild(Unisquirter.createElement("div", {
                "id": "instructions"
            }));
        };
        /* Global manipulations
        */
        /**
         * Completely restarts the game.
         */
        Unisquirt.prototype.gameStart = function () {
            this.PixelDrawer.setBackground(this.createNightGradient());
            this.ItemsHolder.setItem("score", 0);
            this.ItemsHolder.setItem("numberOfJumps", 0);
            this.setMap();
            this.container.querySelector("#instructions").style.display = "block";
            this.container.querySelector("#instructions").textContent = "space to jump; left & right to move";
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
        /* Input
        */
        /**
         * Reacts to the left key being pressed. The player's left key is marked as down,
         * and its sprite is set to face the left if it isn't already.
         *
         * @param Unisquirter   The governing Unisquirt.
         */
        Unisquirt.prototype.keyDownLeft = function (Unisquirter) {
            if (Unisquirter.GamesRunner.getPaused() || !Unisquirter.player.alive) {
                return;
            }
            var player = Unisquirter.player;
            player.keys.left = true;
            player.keys.right = false;
            if (!player.flipHoriz) {
                Unisquirter.flipHoriz(player);
            }
        };
        /**
         * Reacts to the right key being pressed. The player's right key is marked as down,
         * and its sprite is set to face the right if it isn't already.
         *
         * @param Unisquirter   The governing Unisquirt.
         */
        Unisquirt.prototype.keyDownRight = function (Unisquirter) {
            if (Unisquirter.GamesRunner.getPaused() || !Unisquirter.player.alive) {
                return;
            }
            var player = Unisquirter.player;
            player.keys.right = true;
            player.keys.left = false;
            if (player.flipHoriz) {
                Unisquirter.unflipHoriz(player);
            }
        };
        /**
         * Reacts to the space key being pressed. The player's space key is marked as down,
         * and it's animated to jump up and forward.
         *
         * @param Unisquirter   The governing Unisquirt.
         */
        Unisquirt.prototype.keyDownSpace = function (Unisquirter) {
            if (Unisquirter.GamesRunner.getPaused()) {
                return;
            }
            var player = Unisquirter.player;
            if (!player.alive) {
                Unisquirter.gameStart();
                return;
            }
            if (!player.canJump || player.keys.jump) {
                return;
            }
            player.canJump = false;
            player.keys.jump = true;
            Unisquirter.TimeHandler.addEvent(function () {
                player.canJump = true;
            }, 21);
            player.xvel += Unisquirter.unitsize * 3.5 * (player.flipHoriz ? -1 : 1);
            player.yvel = -Unisquirter.unitsize * 3.5;
            if (player.resting) {
                player.xvel += Unisquirter.unitsize * 1.4 * (player.flipHoriz ? -1 : 1);
                player.yvel -= Unisquirter.unitsize * 0.7;
            }
            Unisquirter.animatePlayerStartRunning(player);
            Unisquirter.addCloudsBehindPlayer(player);
            Unisquirter.ItemsHolder.increase("numberOfJumps");
            Unisquirter.container.querySelector("#instructions").style.display = "none";
        };
        /**
         * Reacts to the left key being raised. The player's left key is marked as up.
         *
         * @param Unisquirter   The governing Unisquirt.
         */
        Unisquirt.prototype.keyUpLeft = function (Unisquirter) {
            Unisquirter.player.keys.left = false;
        };
        /**
         * Reacts to the left key being raised. The player's left key is marked as up.
         *
         * @param Unisquirter   The governing Unisquirt.
         */
        Unisquirt.prototype.keyUpRight = function (Unisquirter) {
            Unisquirter.player.keys.right = false;
        };
        /**
         * Reacts to the right key being raised. The player's right key is marked as up.
         *
         * @param Unisquirter   The governing Unisquirt.
         */
        Unisquirt.prototype.keyUpSpace = function (Unisquirter, event) {
            Unisquirter.player.keys.jump = false;
        };
        /* Upkeep maintenence
        */
        /**
         * Maintenance Function for any number of Thing groups. Each Thing with a
         * movement Function has it called. Velocities are applied.
         *
         * @param thingGroups   Any number of Thing groups.
         */
        Unisquirt.prototype.maintainMoving = function () {
            var thingGroups = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                thingGroups[_i - 0] = arguments[_i];
            }
            var things, thing, i, j;
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
        };
        /**
         * Maintenance Function for the player. Air friction and gravity are applied,
         * as well as resting checks.
         *
         * @param player   A Unisquirt's player.
         */
        Unisquirt.prototype.maintainPlayer = function (player) {
            if (!player.alive) {
                return;
            }
            // Horizontal slowdown
            if (Math.abs(player.xvel) > this.unitsize / 4) {
                if (player.resting) {
                    player.xvel *= 0.7;
                }
                else {
                    player.xvel *= 0.96;
                }
            }
            else {
                player.xvel = 0;
                player.Unisquirter.animatePlayerStopRunning(player);
            }
            // Key speed-ups, if on the ground
            if (player.resting) {
                if (player.keys.right) {
                    player.xvel += player.Unisquirter.unitsize / 1.17;
                }
                else if (player.keys.left) {
                    player.xvel -= player.Unisquirter.unitsize / 1.17;
                }
            }
            // Resting && running re-check
            if (player.resting) {
                if (!player.Unisquirter.ThingHitter.checkHit(player, player.resting, "Player", "Solid")) {
                    player.resting = undefined;
                }
                else if (player.xvel !== 0 && (!player.cycles || !player.cycles.running)) {
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
                }
                else if (player.top < player.Unisquirter.MapScreener.top) {
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
            this.ThingHitter.checkHitsOf[player.title](player);
            if (player.shadow) {
                this.ThingHitter.checkHitsOf[player.title](player.shadow);
            }
        };
        /**
         * Determines whether the Player is overlapping the sides of the screen.
         * If it is, a shadow is ensured to exist, and positioned.
         * If it isn't, a shadow is ensured to not exist.
         *
         * @param player   A Player that may be overlapping the sides of the screen.
         */
        Unisquirt.prototype.checkPlayerSidesOverflow = function (player) {
            if (player.left > this.MapScreener.left && player.right < this.MapScreener.right) {
                if (player.shadow) {
                    this.killPlayerShadow(player.shadow);
                }
                return;
            }
            if (!player.shadow) {
                player.shadow = this.addThing("PlayerShadow");
            }
            this.setTop(player.shadow, player.top);
            if (player.right > this.MapScreener.right) {
                this.setRight(player.shadow, player.right - this.MapScreener.right);
                if (player.left > this.MapScreener.right) {
                    this.killPlayerShadow(player.shadow, true);
                }
            }
            else {
                this.setLeft(player.shadow, this.MapScreener.right - (this.MapScreener.left - player.left));
                if (player.right < this.MapScreener.left) {
                    this.killPlayerShadow(player.shadow, true);
                }
            }
        };
        /* Collision detection
        */
        /**
         * Function generator for the generic canThingCollide checker. This is used
         * repeatedly by ThingHittr to generate separately optimized Functions for
         * different Thing types.
         *
         * @returns A Function that determines if a Thing may have its hits checked.
         */
        Unisquirt.prototype.generateCanThingCollide = function () {
            /**
             * Generic checker for whether a Thing may have its hits checked.
             *
             * @param Thing   A Thing that might need to have hits checked.
             * @returns Whether the Thing may have its hits checked.
             */
            return function canThingCollide(thing) {
                return thing.alive && !thing.nocollide;
            };
        };
        /**
         * Function generator for the generic isCharacterTouchingSolid checker. This
         * is used repeately by the ThingHittr to generate separately optimized Functions
         * for different Thing types.
         *
         * @returns A Function that determines if a Character and Solid are hitting, which
         *          is defined as the Character landing on the Solid.
         */
        Unisquirt.prototype.generateIsCharacterTouchingSolid = function () {
            /**
             * Generic checker for whether a Character is landing on a Solid.
             *
             * @param thing   A Character that may be landing on other.
             * @param other   A Solid that thing may be landing on.
             */
            return function isCharacterTouchingSolid(thing, other) {
                return (!thing.nocollide && !other.nocollide
                    && thing.left <= other.right
                    && thing.right >= other.left
                    && other.top - thing.bottom < thing.Unisquirter.unitsize * 2);
            };
        };
        /**
         * Function generator for the generic isCharacterTouchingCharacter checker.
         * This is used repeately by the ThingHittr to generate separately optimized
         * Functions for different Thing types.
         *
         * @returns A Function that determines if a Character and Character are hitting.
         */
        Unisquirt.prototype.generateIsCharacterTouchingParticle = function () {
            /**
             * Generic checker for whether a Character is hitting a Solid.
             *
             * @param thing   A Character that may be hitting other.
             * @param other   A Character that may be hitting thing.
             */
            return function isCharacterTouchingCharacter(thing, other) {
                return (!thing.nocollide && !other.nocollide
                    && thing.right - thing.Unisquirter.unitsize > other.left
                    && thing.left + thing.Unisquirter.unitsize < other.right
                    && thing.bottom >= other.top
                    && thing.top <= other.bottom);
            };
        };
        /**
         * Function generator for the generic hitCharacterSolid callback. This is
         * used repeatedly by ThingHittr to generate separately optimized Functions
         * for different Thing types.
         *
         * @returns A Function for when a Character hits a Solid.
         */
        Unisquirt.prototype.generateHitCharacterSolid = function () {
            /**
             * A callback for when a Character hits a Solid.
             *
             * @param thing   A Character hitting other.
             * @param other   A solid being hit by thing.
             */
            return function hitCharacterSolid(thing, other) {
                thing.resting = other;
                thing.Unisquirter.setBottom(thing, other.top);
                if (thing.player) {
                    thing.Unisquirter.ItemsHolder.setItem("numberOfJumps", 0);
                }
            };
        };
        /**
         * Function generator for the generic hitCharacterCharacter callback. This is
         * used repeatedly by ThingHittr to generate separately optimized Functions
         * for different Thing types.
         *
         * @returns A Function for when a Character hits a Character.
         */
        Unisquirt.prototype.generateHitCharacterParticle = function () {
            /**
             * A callback for when a Character hits a Character. If one is a Player (either
             * the primary one or its shadow), the primary Player is killed.
             *
             * @param thing   A Character hitting other.
             * @param other   A Solid being hit by thing.
             */
            return function hitCharacterCharacter(thing, other) {
                if (thing.player) {
                    thing.Unisquirter.animateCloudBlowingUp(other);
                }
                else if (other.player) {
                    thing.Unisquirter.animateCloudBlowingUp(thing);
                }
                else {
                    return;
                }
                thing.Unisquirter.killPlayer(thing.Unisquirter.player);
            };
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
            thing.yvel = thing.Unisquirter.NumberMaker.randomWithin(-.21, -.007);
            thing.Unisquirter.TimeHandler.addClassCycle(thing, ["one", "two", "three"], "shimmer", thing.Unisquirter.NumberMaker.randomIntWithin(49, 84));
        };
        /**
         * Spawn Function for a Cloud. It immediately starts fading out and floating
         * upwards, and is killed when it's completely faded.
         *
         * @param thing   The Cloud being spawned.
         */
        Unisquirt.prototype.spawnCloud = function (thing) {
            if (thing.noSpawn) {
                return;
            }
            var yvel = -thing.Unisquirter.unitsize / 7, isFading = false;
            thing.nocollide = true;
            thing.opacity = thing.Unisquirter.NumberMaker.randomWithin(.7, .98);
            thing.Unisquirter.TimeHandler.addEventInterval(function () {
                thing.nocollide = false;
            }, 14);
            thing.Unisquirter.TimeHandler.addEventInterval(function () {
                isFading = true;
            }, 117);
            thing.Unisquirter.TimeHandler.addEventInterval(function () {
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
            }, 1, Infinity);
        };
        /**
         * Spawn Function for a Rainbow. It immediately starts fading out, and is
         * killed when it's completely faded.
         *
         * @param thing   The Rainbow being spawned.
         */
        Unisquirt.prototype.spawnRainbow = function (thing) {
            thing.Unisquirter.TimeHandler.addEventInterval(function () {
                thing.opacity -= .1;
                if (thing.opacity <= 0) {
                    thing.Unisquirter.killNormal(thing);
                    return true;
                }
                return false;
            }, 1, Infinity);
        };
        /**
         * Spawn Function for a Text. It immediately stars fading out and floating
         * upwards, and is killed when it's completely faded.
         *
         * @param thing   The Text being spawned.
         */
        Unisquirt.prototype.spawnText = function (thing) {
            thing.Unisquirter.TimeHandler.addEventInterval(function () {
                thing.Unisquirter.shiftVert(thing, -thing.Unisquirter.unitsize / 2);
                return thing.opacity <= 0;
            }, 1, Infinity);
            thing.Unisquirter.TimeHandler.addEvent(function () {
                thing.Unisquirter.TimeHandler.addEventInterval(function () {
                    thing.opacity -= .07;
                    return thing.opacity <= 0;
                }, 1, Infinity);
            }, 14);
        };
        /**
         * Spawn Function for a PlayerShadow. It's consistently kept at the same class
         * as the actual Player.
         *
         * @param thing   The PlayerShadow being spawned.
         */
        Unisquirt.prototype.spawnPlayerShadow = function (thing) {
            thing.Unisquirter.TimeHandler.addEventInterval(function () {
                if (!thing.alive) {
                    return true;
                }
                thing.Unisquirter.setClass(thing, thing.Unisquirter.player.className);
                return false;
            }, 1, Infinity);
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
        /* Animations
        */
        /**
         * Animation Function for a Player starting to run. The "running" cycle is
         * added along with the class.
         *
         * @param player   The Player starting to run.
         */
        Unisquirt.prototype.animatePlayerStartRunning = function (player) {
            if (player.cycles && player.cycles.running) {
                return;
            }
            player.Unisquirter.TimeHandler.addClassCycle(player, ["one", "two", "three", "four", "five", "six"], "running", 4);
            player.Unisquirter.addClass(player, "running");
        };
        /**
         * Animation Function for a player stopping running. The "running" cycle is
         * removed along with the class.
         *
         * @param player   The Player stopping running.
         */
        Unisquirt.prototype.animatePlayerStopRunning = function (player) {
            player.Unisquirter.removeClasses(player, "running");
            player.Unisquirter.TimeHandler.cancelClassCycle(player, "running");
        };
        /**
         * Animation Function for a Cloud blowing up. A replacement is put on the same
         * place as the original, and timed to expand and fade away.
         *
         * @param thing   The Cloud blowing up.
         */
        Unisquirt.prototype.animateCloudBlowingUp = function (thing) {
            var _this = this;
            var replacement = thing.Unisquirter.ObjectMaker.make("Cloud", {
                "noSpawn": true
            });
            thing.Unisquirter.addThing(replacement, thing.left, thing.top);
            thing.Unisquirter.killNormal(thing);
            thing.Unisquirter.TimeHandler.addEventInterval(function () {
                replacement.scale += .07;
                replacement.scale *= 1.014;
                thing.Unisquirter.setLeft(replacement, thing.left - replacement.width * (replacement.scale - 1) * _this.unitsize / 2);
                thing.Unisquirter.setTop(replacement, thing.top - replacement.height * (replacement.scale - 1) * _this.unitsize / 2);
                return replacement.opacity <= 0;
            }, 1, Infinity);
            thing.Unisquirter.TimeHandler.addEvent(function () {
                thing.Unisquirter.TimeHandler.addEventInterval(function () {
                    replacement.opacity -= .15;
                    return replacement.opacity <= 0;
                }, 1, Infinity);
            }, 28);
            thing.Unisquirter.animateBloodEffects(thing);
        };
        /**
         * Animation Function for bloods spurting from a Cloud hitting a Player.
         * A random number of Blood Things, in proportion to the number of jumps, are
         * spawned and animated with random velocities, scales, and opacities.
         *
         * @param thing   The Cloud that just hit a Player.
         */
        Unisquirt.prototype.animateBloodEffects = function (thing) {
            var _this = this;
            var midX = thing.Unisquirter.getMidX(thing), midY = thing.Unisquirter.getMidY(thing), opacity = 1, bloods = [], settings = {}, blood, i;
            for (i = 7 * thing.Unisquirter.ItemsHolder.getItem("numberOfJumps"); i >= 0; i -= 1) {
                settings.opacity = thing.Unisquirter.NumberMaker.randomWithin(0.7, 1);
                settings.scale = thing.Unisquirter.NumberMaker.randomWithin(0.35, 2.1);
                settings.xvel = thing.Unisquirter.NumberMaker.randomWithin(-0.7, 0.7) * thing.Unisquirter.unitsize;
                settings.yvel = thing.Unisquirter.NumberMaker.randomWithin(0.35, -1.75) * thing.Unisquirter.unitsize;
                blood = thing.Unisquirter.ObjectMaker.make("Blood", settings);
                bloods.push(blood);
                thing.Unisquirter.addThing(blood, midX, midY);
            }
            thing.Unisquirter.TimeHandler.addEventInterval(function () {
                opacity -= .021;
                for (i = 0; i < bloods.length; i += 1) {
                    bloods[i].opacity = opacity;
                    bloods[i].yvel += _this.unitsize / 35;
                }
                return opacity <= 0;
            }, 1, Infinity);
        };
        /**
         * Animation Function for points appearing above a jump. Text Things are added
         * in a horizontal line and timed to float upwards and fade away.
         *
         * @param player   The Player to have text appear above.
         * @param gained   How many points were gained.
         */
        Unisquirt.prototype.animateScorePoints = function (player, gained) {
            var text = gained.toString(), things = [], padding = this.MathDecider.getConstant("textPadding"), totalWidth = -padding, top = player.top, left, thing, i;
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
        };
        /* Actions
        */
        /**
         * Adds a random number of Clouds just behind a Player, and increases the score.
         *
         * @param player   A Player emitting Clouds.
         */
        Unisquirt.prototype.addCloudsBehindPlayer = function (player) {
            for (var i = this.MathDecider.compute("numberOfClouds", this.ItemsHolder.getItem("numberOfJumps")); i > 0; i -= 1) {
                this.addCloudBehindPlayer(player, i / 3);
            }
            var score = this.ItemsHolder.getItem("score"), gained = this.MathDecider.compute("pointIncrease", this.ItemsHolder.getItem("numberOfJumps"));
            score += gained;
            this.ItemsHolder.setItem("score", score);
            if (score > this.ItemsHolder.getItem("record")) {
                this.ItemsHolder.setItem("record", score);
                this.ItemsHolder.saveItem("record");
            }
            this.animateScorePoints(player, gained);
        };
        /**
         * Adds a Cloud just behind a Player, based on where the Player is facing.
         *
         * @param player   A Player emitting a Cloud.
         * @param chaos   A multiplier for cloud velocities.
         * @returns The newly created Cloud.
         */
        Unisquirt.prototype.addCloudBehindPlayer = function (player, chaos) {
            var cloud = this.ObjectMaker.make("Cloud", {
                "xvel": player.xvel * -.35
            });
            this.addThingBehindPlayerGeneral(player, cloud);
            this.shiftHoriz(cloud, this.NumberMaker.randomWithin(-this.unitsize * 3, this.unitsize * 3));
            this.shiftVert(cloud, this.NumberMaker.randomWithin(-this.unitsize, this.unitsize));
            cloud.xvel += this.NumberMaker.randomWithin(-this.unitsize * chaos / 3, this.unitsize * chaos / 3);
            cloud.yvel += this.NumberMaker.randomWithin(-this.unitsize * chaos / 14, this.unitsize * chaos / 14);
            cloud.yvel += player.yvel / 10;
            return cloud;
        };
        /**
         * Adds a set of Rainbows just behind a Player, based on where the Player is facing.
         *
         * @param player   A Player emitting Rainbows.
         */
        Unisquirt.prototype.addRainbowBehindPlayer = function (player) {
            var position = this.getPlayerBehindPosition(player, this.ObjectMaker.make("Rainbow")), direction = player.flipHoriz ? 1 : -1, dx = Math.max(Math.abs(player.xvel), 1), i;
            for (i = 0; i < dx; i += 1) {
                this.addThing("Rainbow", position[0] + i * direction, position[1]);
            }
        };
        /**
         * Adds a Thing just behind a Player, based on where the Player is facing.
         *
         * @param player   A Player emitting some Thing.
         * @param thing   The Thing being emitted.
         */
        Unisquirt.prototype.addThingBehindPlayerGeneral = function (player, thing) {
            var position = this.getPlayerBehindPosition(player, thing);
            this.addThing(thing, position[0] - thing.width * this.unitsize / 2, position[1]);
        };
        /**
         * Determines the optimal location to place a Thing at a Player's buttocks.
         *
         * @param player   The Player whose buttocks shall be placed upon.
         * @param thing   The Thing being placed on and/or in the Player's buttocks.
         * @returns The [left, top] position of the Player's buttocks' peak point.
         */
        Unisquirt.prototype.getPlayerBehindPosition = function (player, thing) {
            var referenceThing = player, left, top;
            // If the Player has a shadow and the shadow's rear is visible,
            // that becomes the position reference
            if (player.shadow) {
                if (player.flipHoriz) {
                    if (player.right > this.MapScreener.right) {
                        referenceThing = player.shadow;
                    }
                }
                else {
                    if (player.left < this.MapScreener.left) {
                        referenceThing = player.shadow;
                    }
                }
            }
            if (player.flipHoriz) {
                left = referenceThing.right - this.unitsize / 2;
                left -= (thing.width + 11) * this.unitsize / 2;
            }
            else {
                left = referenceThing.left + this.unitsize / 2;
                left += (thing.width + 10) * this.unitsize / 2;
            }
            top = referenceThing.top + 13 * this.unitsize;
            return [left, top];
        };
        /* Deaths
        */
        /**
         * Kills a Player by freezing its cycles, flipping and fading it, removing any
         * existing shadow, and setting the help text.
         *
         * @param player   The Player being killed.
         */
        Unisquirt.prototype.killPlayer = function (player) {
            var _this = this;
            var dy = -2.8;
            player.alive = false;
            player.nocollide = true;
            player.xvel = 0;
            player.yvel = 0;
            this.TimeHandler.cancelClassCycle(player, "running");
            this.addClasses(player, "running", "two");
            this.flipVert(player);
            this.TimeHandler.addEventInterval(function () {
                _this.shiftVert(player, _this.unitsize * dy);
                dy += .1;
                return player.opacity <= 0;
            }, 1, Infinity);
            this.TimeHandler.addEventInterval(function () {
                player.opacity -= .015;
                return player.opacity <= 0;
            }, 1, Infinity);
            if (player.shadow) {
                this.killPlayer(player.shadow);
            }
            this.container.querySelector("#instructions").style.display = "block";
            this.container.querySelector("#instructions").textContent = "space to go again";
        };
        /**
         * Kills a Player's shadow and unlists it from its Player.
         *
         * @param player   The PlayerShadow being killed.
         * @param replaceWithPlayer   Whether the Player should be moved to the shadow's
         *                            previous position (by default, false).
         */
        Unisquirt.prototype.killPlayerShadow = function (thing, replaceWithPlayer) {
            this.killNormal(thing);
            thing.Unisquirter.player.shadow = undefined;
            if (replaceWithPlayer) {
                this.setLeft(thing.Unisquirter.player, thing.left);
                this.setTop(thing.Unisquirter.player, thing.top);
            }
        };
        /* Map sets
        */
        /**
         * Sets the game state to the "Night" map and "Sky" location, resetting all
         * Things, inputs, and other previous game state in the process.
         */
        Unisquirt.prototype.setMap = function () {
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
        };
        /**
         * Adds a new Player Thing to the game, centered horizontally and 16 in-game pixels
         * from the bottom vertically, and sets it as .player.
         *
         * @returns The newly created Thing.
         */
        Unisquirt.prototype.addPlayer = function () {
            var player = this.player = this.ObjectMaker.make("Player", {
                "keys": {
                    "direction": 0
                }
            });
            this.addThing(player, (this.MapScreener.width - player.width * this.unitsize) / 2, this.MapScreener.height - (player.height + 16) * this.unitsize);
            return player;
        };
        /**
         * Adds a Floor Thing stretched across the bottom of the map.
         */
        Unisquirt.prototype.addFloor = function () {
            this.addThing(this.ObjectMaker.make("Floor", {
                "width": this.MapScreener.width * 1.1
            }), this.MapScreener.width * -.1, this.MapScreener.height - 16 * this.unitsize);
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
