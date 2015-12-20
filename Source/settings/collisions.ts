/// <reference path="../Unisquirt.ts" />

module Unisquirt {
    "use strict";

    Unisquirt.settings.collisions = {
        "groupNames": ["Solid", "Character"],
        "keyGroupName": "groupType",
        "globalCheckGenerators": {
            "Character": Unisquirt.prototype.generateCanThingCollide,
            "Solid": Unisquirt.prototype.generateCanThingCollide
        },
        "hitCheckGenerators": {
            "Character": {
                "Solid": Unisquirt.prototype.generateIsCharacterTouchingSolid,
                "Character": Unisquirt.prototype.generateIsCharacterTouchingCharacter
            }
        },
        "hitFunctionGenerators": {
            "Character": {
                "Solid": Unisquirt.prototype.generateHitCharacterSolid,
                "Character": Unisquirt.prototype.generateHitCharacterCharacter
            }
        }
    };
}
