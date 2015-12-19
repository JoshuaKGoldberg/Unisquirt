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
                "Scenery": {},
                "Solid": {},
                "Text": {}
            }
        },
        "properties": {
            "Area": {},
            "Location": {},
            "Map": {},
            "Quadrant": {},
            "Thing": {
                "onMake": Unisquirt.prototype.thingProcess,
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
            "Solid": {
                "groupType": "Solid"
            },
            "Text": {
                "groupType": "Text"
            }
        }
    };
}
