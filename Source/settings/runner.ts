/// <reference path="../Unisquirt.ts" />

module Unisquirt {
    "use strict";

    Unisquirt.settings.runner = {
        "games": [
            function (): void {
                this.DeviceLayer.checkNavigatorGamepads();
                this.DeviceLayer.activateAllGamepadTriggers();
            },
            function (): void {
                this.QuadsKeeper.determineAllQuadrants("Particle", this.GroupHolder.getParticleGroup());
                this.QuadsKeeper.determineAllQuadrants("Character", this.GroupHolder.getCharacterGroup());
                this.QuadsKeeper.determineAllQuadrants("Solid", this.GroupHolder.getSolidGroup());
            },
            function (): void {
                this.maintainMoving(
                    this.GroupHolder.getParticleGroup(),
                    this.GroupHolder.getCharacterGroup(),
                    this.GroupHolder.getSceneryGroup());
            },
            function (): void {
                this.maintainPlayer(this.player);
            },
            function (): void {
                this.TimeHandler.handleEvents();
            },
            function (): void {
                if (this.player.alive) {
                    this.ItemsHolder.decrease("score");
                }
            },
            function (): void {
                this.PixelDrawer.refillGlobalCanvas();
            }
        ]
    };
}
