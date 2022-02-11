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
    var SauvegardePartie = /** @class */ (function () {
        function SauvegardePartie() {
            this.propositions = [];
            this.datePartie = new Date();
        }
        return SauvegardePartie;
    }());
    exports.default = SauvegardePartie;
});
//# sourceMappingURL=sauvegardePartie.js.map