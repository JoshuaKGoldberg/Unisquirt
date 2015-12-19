/// <reference path="../Unisquirt.ts" />

module Unisquirt {
    "use strict";

    Unisquirt.settings.events = {
        "keyOnClassCycleStart": "onThingAdd",
        "keyDoClassCycleStart": "placed",
        "keyCycleCheckValidity": "alive"
    };
}
