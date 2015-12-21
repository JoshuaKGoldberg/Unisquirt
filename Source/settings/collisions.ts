/// <reference path="../Unisquirt.ts" />

module Unisquirt {
    "use strict";

    Unisquirt.settings.collisions = {
        "groupNames": ["Character", "Particle", "Solid"],
        "keyGroupName": "groupType",
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
        "hitFunctionGenerators": {
            "Character": {
                "Particle": Unisquirt.prototype.generateHitCharacterParticle,
                "Solid": Unisquirt.prototype.generateHitCharacterSolid
            }
        }
    };
}
