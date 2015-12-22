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
                "Particle": {
                    "Cloud": {},
                    "Blood": {},
                    "Text": {
                        "Char0": {},
                        "Char1": {},
                        "Char2": {},
                        "Char3": {},
                        "Char4": {},
                        "Char5": {},
                        "Char6": {},
                        "Char7": {},
                        "Char8": {},
                        "Char9": {}
                    }
                },
                "Character": {
                    "Player": {
                        "PlayerShadow": {}
                    }
                },
                "Scenery": {
                    "Rainbow": {},
                    "Star": {}
                },
                "Solid": {
                    "Floor": {}
                }
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
            "Particle": {
                "groupType": "Particle",
                "nocollide": true
            },
            "Cloud": {
                "width": 7,
                "height": 7,
                "onThingAdded": Unisquirt.prototype.spawnCloud
            },
            "Blood": {
                "width": 3,
                "height": 3
            },
            "Text": {
                "width": 8,
                "height": 8,
                "onThingAdded": Unisquirt.prototype.spawnText
            },
            "Character": {
                "groupType": "Character"
            },
            "Player": {
                "width": 44,
                "height": 33,
                "canJump": true,
                "player": true
            },
            "PlayerShadow": {
                "onThingAdded": Unisquirt.prototype.spawnPlayerShadow
            },
            "Scenery": {
                "groupType": "Scenery"
            },
            "Rainbow": {
                "width": 1,
                "height": 14,
                "scale": 0.5,
                "onThingAdded": Unisquirt.prototype.spawnRainbow
            },
            "Star": {
                "width": 8,
                "height": 8,
                "scale": 0.5,
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
            }
        }
    };
}
