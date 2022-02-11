(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SauvegardeStats = /** @class */ (function () {
        function SauvegardeStats() {
            this.dernierePartie = new Date();
            this.partiesJouees = 0;
            this.partiesGagnees = 0;
            this.repartition = {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                "-": 0,
            };
            this.lettresRepartitions = {
                bienPlace: 0,
                malPlace: 0,
                nonTrouve: 0,
            };
        }
        SauvegardeStats.Default = {
            partiesJouees: 0,
            partiesGagnees: 0,
            dernierePartie: new Date(),
            repartition: {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                "-": 0,
            },
            lettresRepartitions: {
                bienPlace: 0,
                malPlace: 0,
                nonTrouve: 0,
            },
        };
        return SauvegardeStats;
    }());
    exports.default = SauvegardeStats;
});
//# sourceMappingURL=sauvegardeStats.js.map