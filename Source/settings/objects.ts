/// <reference path="../Unisquirt.ts" />

module Unisquirt {
    "use strict";

    Unisquirt.settings.objects = {
        "onMake": "onMake",
        "doPropertiesFull": true,
        "inheritance": {
            "Area": {},
            "Location": {},
            "Map": {},
            "Quadrant": {},
            "Thing": {
                "Character": {
                    "Player": {}
                },
                "Particle": {},
                "Scenery": {
                    "Star": {}
                },
                "Solid": {
                    "Floor": {}
                },
                "Text": {}
            }
        },
        "properties": {
            "Area": {},
            "Location": {},
            "Map": {},
            "Quadrant": {},
            "Thing": {
                "width": 8,
                "height": 8,
                "alive": true,
                "scale": 1,
                "opacity": 1,
                "xvel": 0,
                "yvel": 0,
                "onMake": Unisquirt.prototype.thingProcess
            },
            "Character": {
                "groupType": "Character"
            },
            "Player": {
                "width": 39,
                "height": 31,
                "canJump": true
            },
            "Particle": {
                "groupType": "Particle"
            },
            "Scenery": {
                "groupType": "Scenery"
            },
            "Star": {
                "width": 8,
                "height": 8,
                "scale": .5,
                "opacity": .7,
                "onThingAdded": Unisquirt.prototype.spawnStar,
                "movement": Unisquirt.prototype.moveStar
            },
            "Solid": {
                "width": 56,
                "height": 31,
                "repeat": true,
                "groupType": "Solid"
            },
            "Floor": {
                "height": 16
            },
            "Text": {
                "groupType": "Text"
            }
        }
    };
}
