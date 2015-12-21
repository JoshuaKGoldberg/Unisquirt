/// <reference path="../Unisquirt.ts" />
var Unisquirt;
(function (Unisquirt) {
    "use strict";
    Unisquirt.Unisquirt.settings.math = {
        "constants": {
            "starDistance": 7,
            "cloudPointBase": 25,
            "cloudPointIncrease": 5
        },
        "equations": {
            "pointIncrease": function (constants, equations, numberofJumps) {
                return constants.cloudPointBase + numberofJumps * constants.cloudPointIncrease;
            }
        }
    };
})(Unisquirt || (Unisquirt = {}));
