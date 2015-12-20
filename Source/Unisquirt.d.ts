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

    export interface ICharacter extends IThing {
        /**
         * A Solid this is resting on, if any.
         */
        resting?: IThing;

        /**
         * Whether this is an IPlayer.
         */
        player?: boolean;

        /**
         * Whether this is currently trotting (walking on the ground).
         */
        trotting?: boolean;

        /**
         * Whether this is currently running (flying through the air).
         */
        running?: boolean;
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
         * The current state of user-provided input.
         */
        keys?: IPlayerKeys;

        /**
         * A 
         */
        shadow?: IPlayer;

        /**
         *
         */
        cycles?: {
            trotting: TimeHandlr.ITimeCycle;
            running: TimeHandlr.ITimeCycle;
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
         * The Thing being controlled by the user.
         */
        player: IPlayer;
        
        /**
         * Kills a Player. For now, this just freezes it in place and disables inputs.
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

        getPlayerBehindPosition(player: IPlayer, thing: IThing): [number, number];

        animatePlayerStartTrotting(player: IPlayer): void;

        animatePlayerStartRunning(player: IPlayer): void;

        animatePlayerStopRunning(player: IPlayer): void;
    }
}
