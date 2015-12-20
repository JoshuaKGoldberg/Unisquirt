/// <reference path="../Unisquirt.ts" />

module Unisquirt {
    "use strict";

    Unisquirt.settings.maps = {
        "mapDefault": "Night",
        "locationDefault": "Sky",
        "groupTypes": ["Text", "Character", "Solid", "Scenery"],
        "screenVariables": {},
        "onSpawn": Unisquirt.prototype.addPreThing,
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
}
