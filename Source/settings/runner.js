/// <reference path="../Unisquirt.ts" />
var Unisquirt;
(function (Unisquirt) {
    "use strict";
    Unisquirt.Unisquirt.settings.runner = {
        "games": [
            function () {
                this.DeviceLayer.checkNavigatorGamepads();
                this.DeviceLayer.activateAllGamepadTriggers();
            },
            function () {
                this.QuadsKeeper.determineAllQuadrants("Character", this.GroupHolder.getCharacterGroup());
                this.QuadsKeeper.determineAllQuadrants("Particle", this.GroupHolder.getParticleGroup());
                this.QuadsKeeper.determineAllQuadrants("Scenery", this.GroupHolder.getSceneryGroup());
                this.QuadsKeeper.determineAllQuadrants("Solid", this.GroupHolder.getSolidGroup());
                this.QuadsKeeper.determineAllQuadrants("Text", this.GroupHolder.getTextGroup());
            },
            function () {
                this.TimeHandler.handleEvents();
            },
            function () {
                this.PixelDrawer.refillGlobalCanvas();
            }
        ]
    };
})(Unisquirt || (Unisquirt = {}));
