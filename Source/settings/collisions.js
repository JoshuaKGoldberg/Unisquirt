/// <reference path="../Unisquirt.ts" />
var Unisquirt;
(function (Unisquirt) {
    "use strict";
    Unisquirt.Unisquirt.settings.collisions = {
        "groupNames": ["Solid", "Character"],
        "keyGroupName": "groupType",
        "globalCheckGenerators": {
            "Character": Unisquirt.Unisquirt.prototype.generateCanThingCollide,
            "Solid": Unisquirt.Unisquirt.prototype.generateCanThingCollide
        },
        "hitCheckGenerators": {
            "Character": {
                "Solid": Unisquirt.Unisquirt.prototype.generateIsCharacterTouchingSolid,
                "Character": Unisquirt.Unisquirt.prototype.generateIsCharacterTouchingCharacter
            }
        },
        "hitFunctionGenerators": {
            "Character": {
                "Solid": Unisquirt.Unisquirt.prototype.generateHitCharacterSolid,
                "Character": Unisquirt.Unisquirt.prototype.generateHitCharacterCharacter
            }
        }
    };
})(Unisquirt || (Unisquirt = {}));
