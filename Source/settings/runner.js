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
                this.QuadsKeeper.determineAllQuadrants("Solid", this.GroupHolder.getSolidGroup());
            },
            function () {
                this.maintainMoving(this.GamesRunner.getFPSAnalyzer().getAverage(), this.GroupHolder.getSolidGroup(), this.GroupHolder.getCharacterGroup(), this.GroupHolder.getSceneryGroup());
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
