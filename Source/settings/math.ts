/// <reference path="../Unisquirt.ts" />

module Unisquirt {
    "use strict";

    Unisquirt.settings.math = {
        "constants": {
            "starDistance": 7,
            "cloudPointBase": 25,
            "cloudPointIncrease": 5,
            "textPadding": 0.5
        },
        "equations": {
            "pointIncrease": function (constants: any, equations: any, numberofJumps: number): number {
                return constants.cloudPointBase + numberofJumps * constants.cloudPointIncrease;
            },
            "numberOfClouds": function (constants: any, equations: any, numberOfJumps: number): number {
                return 7 + Math.pow(numberOfJumps, .7) | 0;
            }
        }
    };
}
