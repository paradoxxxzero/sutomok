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
    var PartieEnCours = /** @class */ (function () {
        function PartieEnCours() {
        }
        return PartieEnCours;
    }());
    exports.default = PartieEnCours;
});
//# sourceMappingURL=partieEnCours.js.map