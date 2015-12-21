/// <reference path="../Unisquirt.ts" />
var Unisquirt;
(function (Unisquirt) {
    "use strict";
    Unisquirt.Unisquirt.settings.statistics = {
        "prefix": "Unisquirt",
        "doMakeContainer": true,
        "containersArguments": [
            ["table", {
                    "id": "dataDisplay",
                    "style": {
                        "position": "absolute",
                        "top": 0,
                        "width": "100%",
                        "color": "white",
                        "textAlign": "center"
                    }
                }],
            ["tr", {
                    "style": {
                        "padding": "7px 14px 0 14px",
                        "textAlign": "center"
                    }
                }]
        ],
        "defaults": {
            "elementTag": "td"
        },
        "values": {
            "score": {
                "minimum": 0,
                "valueDefault": 0,
                "hasElement": true
            },
            "numberOfJumps": {
                "valueDefault": 0
            },
            "record": {
                "valueDefault": 0,
                "storeLocally": true,
                "hasElement": true
            }
        }
    };
})(Unisquirt || (Unisquirt = {}));
