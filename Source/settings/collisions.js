/// <reference path="../Unisquirt.ts" />
var Unisquirt;
(function (Unisquirt) {
    "use strict";
    Unisquirt.Unisquirt.settings.collisions = {
        "keyGroupName": "groupType",
        "keyTypeName": "title",
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
        "hitCallbackGenerators": {
            "Character": {
                "Particle": Unisquirt.Unisquirt.prototype.generateHitCharacterParticle,
                "Solid": Unisquirt.Unisquirt.prototype.generateHitCharacterSolid
            }
        }
    };
})(Unisquirt || (Unisquirt = {}));
