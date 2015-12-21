/// <reference path="../Unisquirt.ts" />

module Unisquirt {
    "use strict";

    Unisquirt.settings.math = {
        "constants": {
            "starDistance": 7,
            "cloudPointBase": 25,
            "cloudPointIncrease": 5
        },
        "equations": {
            "pointIncrease": function (constants: any, equations: any, numberofJumps: number) {
                return constants.cloudPointBase + numberofJumps * constants.cloudPointIncrease;
            }
        }
    };
}
