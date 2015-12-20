/// <reference path="../Unisquirt.ts" />
var Unisquirt;
(function (Unisquirt) {
    "use strict";
    Unisquirt.Unisquirt.settings.input = {
        "InputWritrArgs": {
            "aliases": {
                // Keyboard aliases
                "left": [65, 37],
                "right": [68, 39],
                "space": [32] // space
            },
            "triggers": {
                "onkeydown": {
                    "left": Unisquirt.Unisquirt.prototype.keyDownLeft,
                    "right": Unisquirt.Unisquirt.prototype.keyDownRight,
                    "space": Unisquirt.Unisquirt.prototype.keyDownSpace
                },
                "onkeyup": {
                    "left": Unisquirt.Unisquirt.prototype.keyUpLeft,
                    "right": Unisquirt.Unisquirt.prototype.keyUpRight,
                    "space": Unisquirt.Unisquirt.prototype.keyUpSpace
                },
                "onmousedown": {},
                "onmouseup": {},
                "oncontextmenu": {}
            }
        }
    };
})(Unisquirt || (Unisquirt = {}));
