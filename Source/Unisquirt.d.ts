/**
 * You're a rainbow-pooping unicorn. How long can you last?
 */
declare module Unisquirt {
    /**
     * A Thing with traits specific to a Unisquirt.
     */
    export interface IThing extends GameStartr.IThing {
        Unisquirter: IUnisquirt;
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
        keys: IPlayerKeys;
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
    }
}
