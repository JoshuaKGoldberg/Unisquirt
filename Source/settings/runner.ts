/// <reference path="../Unisquirt.ts" />

module Unisquirt {
    "use strict";

    Unisquirt.settings.runner = {
        "games": [
            function () {
                this.DeviceLayer.checkNavigatorGamepads();
                this.DeviceLayer.activateAllGamepadTriggers();
            },
            function () {
                this.QuadsKeeper.determineAllQuadrants("Character", this.GroupHolder.getCharacterGroup());
                this.QuadsKeeper.determineAllQuadrants("Solid", this.GroupHolder.getSolidGroup());
            },
            function () {
                this.maintainMoving(
                    this.GroupHolder.getSolidGroup(),
                    this.GroupHolder.getCharacterGroup(),
                    this.GroupHolder.getSceneryGroup());
            },
            function () {
                this.maintainPlayer(this.player);
            },
            function () {
                this.TimeHandler.handleEvents();
            },
            function () {
                this.PixelDrawer.refillGlobalCanvas();
            }
        ]
    };
}
