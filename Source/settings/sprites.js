/// <reference path="../Unisquirt.ts" />
var Unisquirt;
(function (Unisquirt) {
    "use strict";
    Unisquirt.Unisquirt.settings.sprites = {
        "spriteWidth": "spritewidthpixels",
        "spriteHeight": "spriteheightpixels",
        "flipVert": "flip-vert",
        "flipHoriz": "flipped",
        "paletteDefault": [
            [0, 0, 0, 0],
            // Grayscales (1-4)
            [255, 255, 255, 255],
            [0, 0, 0, 255],
            [188, 188, 188, 255],
            [116, 116, 116, 255]
        ],
        "filters": {},
        "library": {
            "Character": {
                "Player": "x1768,"
            },
            "Particle": {},
            "Scenery": {},
            "Solid": {},
            "Text": {}
        }
    };
})(Unisquirt || (Unisquirt = {}));
