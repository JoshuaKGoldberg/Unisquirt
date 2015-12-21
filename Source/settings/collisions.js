/// <reference path="../Unisquirt.ts" />
var Unisquirt;
(function (Unisquirt) {
    "use strict";
    Unisquirt.Unisquirt.settings.collisions = {
        "groupNames": ["Character", "Particle", "Solid"],
        "keyGroupName": "groupType",
        "globalCheckGenerators": {
            "Character": Unisquirt.Unisquirt.prototype.generateCanThingCollide,
            "Particle": Unisquirt.Unisquirt.prototype.generateCanThingCollide,
            "Solid": Unisquirt.Unisquirt.prototype.generateCanThingCollide
        },
        "hitCheckGenerators": {
            "Character": {
                "Particle": Unisquirt.Unisquirt.prototype.generateIsCharacterTouchingParticle,
                "Solid": Unisquirt.Unisquirt.prototype.generateIsCharacterTouchingSolid
            }
        },
        "hitFunctionGenerators": {
            "Character": {
                "Particle": Unisquirt.Unisquirt.prototype.generateHitCharacterParticle,
                "Solid": Unisquirt.Unisquirt.prototype.generateHitCharacterSolid
            }
        }
    };
})(Unisquirt || (Unisquirt = {}));
