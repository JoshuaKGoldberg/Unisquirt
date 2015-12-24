/// <reference path="../Unisquirt.ts" />

module Unisquirt {
    "use strict";

    Unisquirt.settings.collisions = {
        "keyGroupName": "groupType",
        "keyTypeName": "title",
        "globalCheckGenerators": {
            "Character": Unisquirt.prototype.generateCanThingCollide,
            "Particle": Unisquirt.prototype.generateCanThingCollide,
            "Solid": Unisquirt.prototype.generateCanThingCollide
        },
        "hitCheckGenerators": {
            "Character": {
                "Particle": Unisquirt.prototype.generateIsCharacterTouchingParticle,
                "Solid": Unisquirt.prototype.generateIsCharacterTouchingSolid
            }
        },
        "hitCallbackGenerators": {
            "Character": {
                "Particle": Unisquirt.prototype.generateHitCharacterParticle,
                "Solid": Unisquirt.prototype.generateHitCharacterSolid
            }
        }
    };
}
