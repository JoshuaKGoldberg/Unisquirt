/// <reference path="../Unisquirt.ts" />
var Unisquirt;
(function (Unisquirt) {
    "use strict";
    Unisquirt.Unisquirt.settings.math = {
        "constants": {
            "starDistance": 7,
            "cloudPointBase": 35,
            "cloudPointIncrease": 5,
            "textPadding": 0.5
        },
        "equations": {
            "pointIncrease": function (constants, equations, numberofJumps) {
                return constants.cloudPointBase + numberofJumps * constants.cloudPointIncrease;
            },
            "numberOfClouds": function (constants, equations, numberOfJumps) {
                return 7 + Math.pow(numberOfJumps, .7) | 0;
            }
        }
    };
})(Unisquirt || (Unisquirt = {}));
