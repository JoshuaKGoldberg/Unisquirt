/// <reference path="../Unisquirt.ts" />
var Unisquirt;
(function (Unisquirt) {
    "use strict";
    Unisquirt.Unisquirt.settings.events = {
        "keyOnClassCycleStart": "onThingAdd",
        "keyDoClassCycleStart": "placed",
        "keyCycleCheckValidity": "alive"
    };
})(Unisquirt || (Unisquirt = {}));
