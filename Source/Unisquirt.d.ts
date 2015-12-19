/**
 * You're a rainbow-pooping unicorn. How long can you last?
 */
declare module Unisquirt {
    /**
     * A Thing with traits specific to a Unisquirt.
     */
    export interface IThing extends GameStartr.IThing {
        Unisquirt: IUnisquirt;
    }

    /**
     * A Player Thing, which is normally controlled by the user.
     */
    export interface IPlayer extends IThing { }

    /**
     * IGameStartr implementation for Unisquirt.
     */
    export interface IUnisquirt extends GameStartr.IGameStartr {

    }
}
