/// <reference path="../Unisquirt.ts" />

module Unisquirt {
    "use strict";

    Unisquirt.settings.ui = {
        "helpSettings": {
            "openings": []
        },
        "globalName": "Unisquirter",
        "styleSheet": {
            "@font-face": {
                "font-family": "'Press Start'",
                "src": [
                    "url('Fonts/pressstart2p-webfont.eot')",
                    "url('Fonts/pressstart2p-webfont.eot?#iefix') format('embedded-opentype')",
                    "url('Fonts/pressstart2p-webfont.woff') format('woff')",
                    "url('Fonts/pressstart2p-webfont.ttf') format('truetype')",
                    "url('Fonts/pressstart2p-webfont.svg') format('svg')"
                ].join(", "),
                "font-weight": "normal",
                "font-style": "normal"
            }
        },
        "sizes": {
            "Full Screen": {
                "width": Math.min(280 * Unisquirt.unitsize, window.innerWidth),
                "height": Math.min(350 * Unisquirt.unitsize, window.innerHeight)
            }
        },
        "sizeDefault": "Full Screen",
        "schemas": []
    };
}
