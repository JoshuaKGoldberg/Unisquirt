/// <reference path="../Unisquirt.ts" />
var Unisquirt;
(function (Unisquirt) {
    "use strict";
    Unisquirt.Unisquirt.settings.maps = {
        "mapDefault": "Night",
        "locationDefault": "Sky",
        "groupTypes": [],
        "screenVariables": {},
        "onSpawn": console.log.bind(console, "Spawning:"),
        "macros": {},
        "entrances": {},
        "library": {
            "Night": {
                "name": "Night",
                "locationDefault": "Sky",
                "locations": {
                    "Sky": {}
                },
                "areas": {
                    "Sky": {
                        "creation": []
                    }
                }
            }
        }
    };
})(Unisquirt || (Unisquirt = {}));
