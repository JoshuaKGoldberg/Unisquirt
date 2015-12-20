/// <reference path="../Unisquirt.ts" />

module Unisquirt {
    "use strict";

    Unisquirt.settings.input = {
        "InputWritrArgs": {
            "aliases": {
                // Keyboard aliases
                "left": [65, 37],  // a,     left
                "right": [68, 39], // d,     right
                "space": [32]      // space
            },
            "triggers": {
                "onkeydown": {
                    "left": Unisquirt.prototype.keyDownLeft,
                    "right": Unisquirt.prototype.keyDownRight,
                    "space": Unisquirt.prototype.keyDownSpace
                },
                "onkeyup": {
                    "left": Unisquirt.prototype.keyUpLeft,
                    "right": Unisquirt.prototype.keyUpRight,
                    "space": Unisquirt.prototype.keyUpSpace
                },
                "onmousedown": {},
                "onmouseup": {},
                "oncontextmenu": {}
            }
        }
    };
}
