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
            _super.call(this, settings);
        }
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
        return Unisquirt;
    })(GameStartr.GameStartr);
    Unisquirt_1.Unisquirt = Unisquirt;
})(Unisquirt || (Unisquirt = {}));
