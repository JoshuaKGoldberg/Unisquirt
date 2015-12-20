/// <reference path="../Unisquirt.ts" />
var Unisquirt;
(function (Unisquirt) {
    "use strict";
    Unisquirt.Unisquirt.settings.objects = {
        "onMake": "onMake",
        "doPropertiesFull": true,
        "inheritance": {
            "Area": {},
            "Location": {},
            "Map": {},
            "Quadrant": {},
            "Thing": {
                "Character": {
                    "Cloud": {},
                    "Player": {
                        "PlayerShadow": {}
                    }
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
                "onMake": Unisquirt.Unisquirt.prototype.thingProcess
            },
            "Character": {
                "groupType": "Character"
            },
            "Cloud": {
                "width": 21,
                "height": 21,
                "onThingAdded": Unisquirt.Unisquirt.prototype.spawnCloud
            },
            "Player": {
                "width": 39,
                "height": 31,
                "canJump": true,
                "player": true
            },
            "PlayerShadow": {
                "onThingAdded": Unisquirt.Unisquirt.prototype.spawnPlayerShadow
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
                "onThingAdded": Unisquirt.Unisquirt.prototype.spawnStar,
                "movement": Unisquirt.Unisquirt.prototype.moveStar
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
})(Unisquirt || (Unisquirt = {}));
