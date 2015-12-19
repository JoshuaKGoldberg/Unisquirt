// @echo '/// <reference path="GameStartr-0.2.0.ts" />'

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
         * Internal reference to the static settings.
         */
        public settings: GameStartr.IGameStartrStoredSettings;

        /**
         * Initializes a new instance of the Unisquirt class.
         * 
         * @param settings   Settings to be used for initialization.
         */
        constructor(settings: GameStartr.IGameStartrSettings) {
            this.settings = Unisquirt.settings;

            super(settings);
        }
    }
}
