/// <reference path="QuadsKeepr-0.2.1.ts" />
var ThingHittr;
(function (ThingHittr_1) {
    "use strict";
    /**
     * A Thing collision detection automator that unifies GroupHoldr and QuadsKeepr.
     * Things contained in the GroupHoldr's groups have automated collision checking
     * against configurable sets of other groups, along with performance
     * optimizations to help reduce over-reoptimization of Functions.
     */
    var ThingHittr = (function () {
        /**
         * Initializes a new instance of the ThingHittr class.
         *
         * @param settings   Settings to be used for initialization.
         */
        function ThingHittr(settings) {
            if (typeof settings === "undefined") {
                throw new Error("No settings object given to ThingHittr.");
            }
            if (typeof settings.globalCheckGenerators === "undefined") {
                throw new Error("No globalCheckGenerators given to ThingHittr.");
            }
            if (typeof settings.hitCheckGenerators === "undefined") {
                throw new Error("No hitCheckGenerators given to ThingHittr.");
            }
            if (typeof settings.hitFunctionGenerators === "undefined") {
                throw new Error("No hitFunctionGenerators given to ThingHittr.");
            }
            this.globalCheckGenerators = settings.globalCheckGenerators;
            this.hitCheckGenerators = settings.hitCheckGenerators;
            this.hitFunctionGenerators = settings.hitFunctionGenerators;
            this.groupNames = settings.groupNames;
            this.keyNumQuads = settings.keyNumQuads || "numquads";
            this.keyQuadrants = settings.keyQuadrants || "quadrants";
            this.keyGroupName = settings.keyGroupName || "group";
            this.hitChecks = {};
            this.globalChecks = {};
            this.hitFunctions = {};
            this.cachedGroupNames = {};
            this.cachedTypeNames = {};
            this.checkHitsOf = {};
        }
        /* Runtime preparation
        */
        /**
         * Caches the hit checks for a group name. The global check for that group
         * is cached on the name for later use.
         *
         * @param groupName   The name of the container group.
         */
        ThingHittr.prototype.cacheHitCheckGroup = function (groupName) {
            if (this.cachedGroupNames[groupName]) {
                return;
            }
            this.cachedGroupNames[groupName] = true;
            if (typeof this.globalCheckGenerators[groupName] !== "undefined") {
                this.globalChecks[groupName] = this.globalCheckGenerators[groupName]();
            }
        };
        /**
         * Caches the hit checks for a specific type within a group, which involves
         * caching the group's global checker, the hit checkers for each of the
         * type's allowed collision groups, and the hit callbacks for each of those
         * groups.
         * The result is that you can call this.checkHitsOf[typeName] later on, and
         * expect it to work as anything in groupName.
         *
         * @param typeName   The type of the Things to cache for.
         * @param groupName   The name of the container group.
         */
        ThingHittr.prototype.cacheHitCheckType = function (typeName, groupName) {
            if (this.cachedTypeNames[typeName]) {
                return;
            }
            if (typeof this.globalCheckGenerators[groupName] !== "undefined") {
                this.globalChecks[typeName] = this.globalCheckGenerators[groupName]();
            }
            if (typeof this.hitCheckGenerators[groupName] !== "undefined") {
                this.hitChecks[typeName] = this.cacheFunctionGroup(this.hitCheckGenerators[groupName]);
            }
            if (typeof this.hitFunctionGenerators[groupName] !== "undefined") {
                this.hitFunctions[typeName] = this.cacheFunctionGroup(this.hitFunctionGenerators[groupName]);
            }
            this.cachedTypeNames[typeName] = true;
            this.checkHitsOf[typeName] = this.generateHitsCheck(typeName).bind(this);
        };
        /**
         * Function generator for a checkHitsOf tailored to a specific Thing type.
         *
         * @param typeName   The type of the Things to generate for.
         * @returns A Function that can check all hits for a Thing of the given type.
         */
        ThingHittr.prototype.generateHitsCheck = function (typeName) {
            /**
             * Collision detection Function for a Thing. For each Quadrant the Thing
             * is in, for all groups within that Function that the Thing's type is
             * allowed to collide with, it is checked for collision with the Things
             * in that group. For each Thing it does collide with, the appropriate
             * hit Function is called.
             *
             * @param thing   A Thing to check collision detection for.
             */
            return function checkHitsOf(thing) {
                // Don't do anything if the thing shouldn't be checking
                if (typeof this.globalChecks[typeName] !== "undefined" && !this.globalChecks[typeName](thing)) {
                    return;
                }
                var others, other, hitCheck, i, j, k;
                // For each quadrant this is in, look at that quadrant's groups
                for (i = 0; i < thing[this.keyNumQuads]; i += 1) {
                    for (j = 0; j < this.groupNames.length; j += 1) {
                        hitCheck = this.hitChecks[typeName][this.groupNames[j]];
                        // If no hit check exists for this combo, don't bother
                        if (!hitCheck) {
                            continue;
                        }
                        others = thing[this.keyQuadrants][i].things[this.groupNames[j]];
                        // For each other Thing in this group that should be checked...
                        for (k = 0; k < others.length; k += 1) {
                            other = others[k];
                            // If they are the same, breaking prevents double hits
                            if (thing === other) {
                                break;
                            }
                            // Do nothing if these two shouldn't be colliding
                            if (typeof this.globalChecks[other[this.keyGroupName]] !== "undefined"
                                && !this.globalChecks[other[this.keyGroupName]](other)) {
                                continue;
                            }
                            // If they do hit, call the corresponding hitFunction
                            if (hitCheck(thing, other)) {
                                this.hitFunctions[typeName][other[this.keyGroupName]](thing, other);
                            }
                        }
                    }
                }
            };
        };
        /**
         * Manually checks whether two Things are touching.
         *
         * @param thing   A Thing to check collision with.
         * @param other   A Thing to check collision with.
         * @param thingType   The individual type of thing.
         * @param otherGroup   The individual group of other.
         * @returns The result of the hit Function defined for thing's type and
         *          other's group, which should be whether they're touching.
         */
        ThingHittr.prototype.checkHit = function (thing, other, thingType, otherGroup) {
            var checks = this.hitChecks[thingType], check;
            if (!checks) {
                throw new Error("No hit checks defined for " + thingType + ".");
            }
            check = checks[otherGroup];
            if (!check) {
                throw new Error("No hit check defined for " + thingType + " and " + otherGroup + ".");
            }
            return check(thing, other);
        };
        /**
         * Creates a set of cached Objects for when a group of Functions must be
         * generated, rather than a single one.
         *
         * @param functions   The container holding the Functions to be cached.
         * @returns A container of the cached Functions.
         */
        ThingHittr.prototype.cacheFunctionGroup = function (functions) {
            var output = {}, i;
            for (i in functions) {
                if (functions.hasOwnProperty(i)) {
                    output[i] = functions[i]();
                }
            }
            return output;
        };
        return ThingHittr;
    })();
    ThingHittr_1.ThingHittr = ThingHittr;
})(ThingHittr || (ThingHittr = {}));