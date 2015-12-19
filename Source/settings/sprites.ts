/// <reference path="../Unisquirt.ts" />

module Unisquirt {
    "use strict";

    Unisquirt.settings.sprites = {
        "spriteWidth": "spritewidthpixels",
        "spriteHeight": "spriteheightpixels",
        "flipVert": "flip-vert",
        "flipHoriz": "flipped",
        "paletteDefault": [
            [0, 0, 0, 0],
            [255, 255, 255, 255],
            [0, 0, 0, 255],
            [188, 188, 188, 255],
            [116, 116, 116, 255],
            [70, 70, 70, 255]
        ],
        "filters": {},
        "library": {
            "Character": {
                "Player": "x1768,"
            },
            "Particle": {},
            "Scenery": {
                "Star": {
                    "normal": "050505055050050505055000505505050050550500505055550505505",
                    "two": "040404044040040404044000404404040040440400404044440404404",
                    "three": "030303033030030303033000303303030030330300303033330303303",
                }
            },
            "Solid": {
                "Floor": "x4128,"
            },
            "Text": {}
        }
    };
}
