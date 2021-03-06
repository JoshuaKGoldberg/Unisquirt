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
                this.QuadsKeeper.determineAllQuadrants("Particle", this.GroupHolder.getParticleGroup());
                this.QuadsKeeper.determineAllQuadrants("Character", this.GroupHolder.getCharacterGroup());
                this.QuadsKeeper.determineAllQuadrants("Solid", this.GroupHolder.getSolidGroup());
            },
            function () {
                this.maintainMoving(this.GroupHolder.getParticleGroup(), this.GroupHolder.getCharacterGroup(), this.GroupHolder.getSceneryGroup());
            },
            function () {
                this.maintainPlayer(this.player);
            },
            function () {
                this.TimeHandler.handleEvents();
            },
            function () {
                if (this.player.alive) {
                    this.ItemsHolder.decrease("score");
                }
            },
            function () {
                this.PixelDrawer.refillGlobalCanvas();
            }
        ]
    };
})(Unisquirt || (Unisquirt = {}));
