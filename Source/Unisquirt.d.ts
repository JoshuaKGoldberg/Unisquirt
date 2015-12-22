/**
 * You're a rainbow-pooping unicorn. How long can you last?
 */
declare module Unisquirt {
    /**
     * A Thing with traits specific to a Unisquirt.
     */
    export interface IThing extends GameStartr.IThing {
        Unisquirter: IUnisquirt;
        cycles?: TimeHandlr.ITimeCycles;
    }

    /**
     * An in-game Character Thing.
     */
    export interface ICharacter extends IThing {
        /**
         * Whether this is a Player.
         */
        player?: boolean;
    }

    /**
     * An in-game Cloud Thing.
     */
    export interface ICloud extends ICharacter {
        /**
         * Whether this shouldn't have its animation effects played.
         */
        noSpawn?: boolean;
    }

    /**
     * A Player Thing, which is normally controlled by the user.
     */
    export interface IPlayer extends ICharacter {
        /**
         * Whether jump can be pressed (as opposed to it having just been).
         */
        canJump?: boolean;

        /**
         * Whether this is currently running (flying through the air).
         */
        running?: boolean;

        /**
         * The current state of user-provided input.
         */
        keys?: IPlayerKeys;

        /**
         * A Solid this is resting on, if any.
         */
        resting?: IThing;

        /**
         * A secondary sprite of the Player for overlapping the side of the screen.
         */
        shadow?: IPlayer;

        /**
         * TimeHandlr cycles for the Player.
         */
        cycles?: {
            /**
             * Running cycle, if the Player is running.
             */
            running?: TimeHandlr.ITimeCycle;

            [i: string]: TimeHandlr.ITimeCycle;
        }
    }

    /**
     * Status flags for user-provided input.
     */
    export interface IPlayerKeys {
        /**
         * Whether the left key is currently pressed.
         */
        left?: boolean;

        /**
         * Whether the right key is currently pressed.
         */
        right?: boolean;

        /**
         * The current user-indicated direction (-1 for left, 0 for none, 1 for right).
         */
        direction?: number;

        /**
         * Whether the jump key is currently pressed.
         */
        jump?: boolean;
    }

    /**
     * IGameStartr implementation for Unisquirt.
     */
    export interface IUnisquirt extends GameStartr.IGameStartr {
        /**
         * The Player Thing being controlled by the user.
         */
        player: IPlayer;

        /**
         * Reacts to the left key being pressed. The player's left key is marked as down,
         * and its sprite is set to face the left if it isn't already.
         * 
         * @param Unisquirter   The governing Unisquirt.
         */
        keyDownLeft(Unisquirter: Unisquirt): void;

        /**
         * Reacts to the right key being pressed. The player's right key is marked as down,
         * and its sprite is set to face the right if it isn't already.
         * 
         * @param Unisquirter   The governing Unisquirt.
         */
        keyDownRight(Unisquirter: Unisquirt): void;

        /**
         * Reacts to the space key being pressed. The player's space key is marked as down,
         * and it's animated to jump up and forward.
         * 
         * @param Unisquirter   The governing Unisquirt.
         */
        keyDownSpace(Unisquirter: Unisquirt): void;

        /**
         * Reacts to the left key being raised. The player's left key is marked as up.
         * 
         * @param Unisquirter   The governing Unisquirt.
         */
        keyUpLeft(Unisquirter: Unisquirt): void;

        /**
         * Reacts to the left key being raised. The player's left key is marked as up.
         * 
         * @param Unisquirter   The governing Unisquirt.
         */
        keyUpRight(Unisquirter: Unisquirt): void;

        /**
         * Reacts to the right key being raised. The player's right key is marked as up.
         * 
         * @param Unisquirter   The governing Unisquirt.
         */
        keyUpSpace(Unisquirter: Unisquirt, event?: Event): void;

        /**
         * Maintenance Function for any number of Thing groups. Each Thing with a
         * movement Function has it called. Velocities are applied.
         * 
         * @param thingGroups   Any number of Thing groups.
         */
        maintainMoving(...thingGroups: IThing[][]): void;

        /**
         * Maintenance Function for the player. Air friction and gravity are applied,
         * as well as resting checks.
         * 
         * @param player   A Unisquirt's player.
         */
        maintainPlayer(player: IPlayer): void;

        /**
         * Determines whether the Player is overlapping the sides of the screen.
         * If it is, a shadow is ensured to exist, and positioned.
         * If it isn't, a shadow is ensured to not exist.
         * 
         * @param player   A Player that may be overlapping the sides of the screen.
         */
        checkPlayerSidesOverflow(player: IPlayer): void;

        /**
         * Function generator for the generic canThingCollide checker. This is used
         * repeatedly by ThingHittr to generate separately optimized Functions for
         * different Thing types.
         * 
         * @returns A Function that determines if a Thing may have its hits checked.
         */
        generateCanThingCollide(): ThingHittr.IThingCheck;

        /**
         * Function generator for the generic isCharacterTouchingSolid checker. This
         * is used repeately by the ThingHittr to generate separately optimized Functions
         * for different Thing types.
         * 
         * @returns A Function that determines if a Character and Solid are hitting, which
         *          is defined as the Character landing on the Solid.
         */
        generateIsCharacterTouchingSolid(): ThingHittr.IThingHitCheck;

        /**
         * Function generator for the generic isCharacterTouchingCharacter checker. 
         * This is used repeately by the ThingHittr to generate separately optimized 
         * Functions for different Thing types.
         * 
         * @returns A Function that determines if a Character and Character are hitting.
         */
        generateIsCharacterTouchingParticle(): ThingHittr.IThingHitCheck;

        /**
         * Function generator for the generic hitCharacterSolid callback. This is 
         * used repeatedly by ThingHittr to generate separately optimized Functions
         * for different Thing types.
         * 
         * @returns A Function for when a Character hits a Solid.
         */
        generateHitCharacterSolid(): ThingHittr.IThingHitFunction;

        /**
         * Function generator for the generic hitCharacterCharacter callback. This is 
         * used repeatedly by ThingHittr to generate separately optimized Functions
         * for different Thing types.
         * 
         * @returns A Function for when a Character hits a Character.
         */
        generateHitCharacterParticle(): ThingHittr.IThingHitFunction;

        /**
         * Spawn Function for a Star. It's given a random y-velocity updward and 
         * animated to flicker at a random speed.
         * 
         * @param thing   The Star being spawned.
         */
        spawnStar(thing: IThing): void;

        /**
         * Spawn Function for a Cloud. It immediately starts fading out and floating
         * upwards, and is killed when it's completely faded.
         * 
         * @param thing   The Cloud being spawned.
         */
        spawnCloud(thing: ICloud): void;

        /**
         * Spawn Function for a Rainbow. It immediately starts fading out, and is
         * killed when it's completely faded.
         * 
         * @param thing   The Rainbow being spawned.
         */
        spawnRainbow(thing: IThing): void;

        /**
         * Spawn Function for a Text. It immediately stars fading out and floating
         * upwards, and is killed when it's completely faded.
         * 
         * @param thing   The Text being spawned.
         */
        spawnText(thing: IThing): void;

        /**
         * Spawn Function for a PlayerShadow. It's consistently kept at the same class
         * as the actual Player.
         * 
         * @param thing   The PlayerShadow being spawned.
         */
        spawnPlayerShadow(thing: IPlayer): void;

        /**
         * Movement Function for a Star. If it's above the screen, it's shifted to below.
         * 
         * @param thing   The Star in play.
         */
        moveStar(thing: IThing): void;

        /**
         * Animation Function for the Player starting to run. The "running" cycle is 
         * added along with the class.
         * 
         * @param player   The Player starting to run.
         */
        animatePlayerStartRunning(player: IPlayer): void;

        /**
         * Animation Function for a player stopping running. The "running" cycle is
         * removed along with the class.
         * 
         * @param player   The Player stopping running.
         */
        animatePlayerStopRunning(player: IPlayer): void;

        /**
         * Animation Function for a Cloud blowing up. A replacement is put on the same
         * place as the original, and timed to expand and fade away.
         * 
         * @param thing   The Cloud blowing up.
         */
        animateCloudBlowingUp(thing: ICloud): void;

        /**
         * Animation Function for bloods spurting from a Cloud hitting a Player.
         * A random number of Blood Things, in proportion to the number of jumps, are spawned,
         * and animated with random velocities, scales, and opacities.
         * 
         * @param thing   The Cloud that just hit a Player.
         */
        animateBloodEffects(thing: IThing): void;

        /**
         * Animation Function for points appearing above a jump. Text Things are added
         * in a horizontal line and timed to float upwards and fade away.
         * 
         * @param thing   The Thing to have text appear above.
         * @param gained   How many points were gained.
         */
        animateScorePoints(thing: IThing, gained: number | string): void;

        /**
         * Adds a random number of Clouds just behind a Player, and increases the score.
         * 
         * @param player   A Player emitting Clouds.
         */
        addCloudsBehindPlayer(player: IPlayer): void;

        /**
         * Adds a Cloud just behind a Player, based on where the Player is facing.
         * 
         * @param player   A Player emitting a Cloud.
         * @param chaos   A multiplier for cloud velocities.
         * @returns The newly created Cloud.
         */
        addCloudBehindPlayer(player: IPlayer, chaos: number): IThing;

        /**
         * Adds a Rainbow just behind a Player, based on where the Player is facing.
         * 
         * @param player   A Player emitting a Rainbow.
         */
        addRainbowBehindPlayer(player: IPlayer): void;

        /**
         * Adds a Thing just behind a Player, based on where the Player is facing.
         * 
         * @param player   A Player emitting some Thing.
         * @param thing   The Thing being emitted.
         */
        addThingBehindPlayerGeneral(player: IPlayer, thing: IThing): void;

        /**
         * Adds a Thing just behind a Player, based on where the Player is facing.
         * 
         * @param player   A Player emitting some Thing.
         * @param thing   The Thing being emitted.
         */
        addThingBehindPlayerGeneral(player: IPlayer, thing: IThing): void;

        /**
         * Determines the optimal location to place a Thing at a Player's buttocks.
         * 
         * @param player   The Player whose buttocks shall be placed upon.
         * @param thing   The Thing being placed on and/or in the Player's buttocks.
         * @returns The [left, top] position of the Player's buttocks' peak point.
         */
        getPlayerBehindPosition(player: IPlayer, thing: IThing): [number, number];

        /**
         * Kills a Player by freezing its cycles, flipping and fading it, removing any
         * existing shadow, and setting the help text.
         * 
         * @param player   The Player being killed.
         */
        killPlayer(player: IPlayer): void;

        /**
         * Kills a Player's shadow and unlists it from its Player.
         * 
         * @param player   The PlayerShadow being killed.
         * @param replaceWithPlayer   Whether the Player should be moved to the shadow's
         *                            previous position (by default, false).
         */
        killPlayerShadow(thing: IPlayer, replaceWithPlayer?: boolean): void;

        /**
         * Sets the game state to the "Night" map and "Sky" location, resetting all 
         * Things, inputs, and other previous game state in the process.
         */
        setMap(): void;

        /**
         * Adds a new Player Thing to the game, centered horizontally and 16 in-game pixels
         * from the bottom vertically, and sets it as .player.
         * 
         * @returns The newly created Thing.
         */
        addPlayer(): IPlayer;

        /**
         * Adds a Floor Thing stretched across the bottom of the map.
         */
        addFloor(): void;

        /**
         * Adds Star Things scattered across the sky randomly.
         */
        addStars(): void;

        /**
         * Generates a black-blue-indigo gradient from the top-center of the screen
         * to the bottom-right for use as a PixelDrawr background.
         * 
         * @returns The resultant CanvasGradient.
         */
        createNightGradient(): CanvasGradient;
    }
}
