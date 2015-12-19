/// <reference path="../Unisquirt.ts" />
var Unisquirt;
(function (Unisquirt) {
    "use strict";
    Unisquirt.Unisquirt.settings.maps = {
        "mapDefault": "Night",
        "locationDefault": "Sky",
        "groupTypes": ["Particle", "Text", "Character", "Solid", "Scenery"],
        "screenVariables": {},
        "onSpawn": Unisquirt.Unisquirt.prototype.addPreThing,
        "macros": {},
        "entrances": {},
        "library": {
            "Night": {
                "name": "Night",
                "locationDefault": "Sky",
                "locations": {
                    "Sky": {
                        "area": "Sky"
                    }
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
