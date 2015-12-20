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
                "Scenery": {
                    "Rainbow": {},
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
                "width": 7,
                "height": 7,
                "onThingAdded": Unisquirt.Unisquirt.prototype.spawnCloud
            },
            "Player": {
                "width": 44,
                "height": 33,
                "canJump": true,
                "player": true
            },
            "PlayerShadow": {
                "onThingAdded": Unisquirt.Unisquirt.prototype.spawnPlayerShadow
            },
            "Scenery": {
                "groupType": "Scenery"
            },
            "Rainbow": {
                "width": 1,
                "height": 14,
                "scale": 0.5,
                "onThingAdded": Unisquirt.Unisquirt.prototype.spawnRainbow
            },
            "Star": {
                "width": 8,
                "height": 8,
                "scale": 0.5,
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
