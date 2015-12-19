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
                "onMake": Unisquirt.Unisquirt.prototype.thingProcess,
                "width": 8,
                "height": 8,
                "opacity": 1,
                "scale": 1
            },
            "Character": {
                "groupType": "Character"
            },
            "Player": {
                "width": 32,
                "height": 24
            },
            "Particle": {
                "groupType": "Particle"
            },
            "Scenery": {
                "groupType": "Scenery"
            },
            "Star": {
                "spriteCycleSynched": [
                    ["one", "two", "three", "two"],
                    "shimmer",
                    70
                ]
            },
            "Solid": {
                "groupType": "Solid",
                "repeat": true
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
