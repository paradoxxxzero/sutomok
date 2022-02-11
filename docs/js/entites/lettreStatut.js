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
    exports.LettreStatut = void 0;
    var LettreStatut;
    (function (LettreStatut) {
        LettreStatut[LettreStatut["NonTrouve"] = 0] = "NonTrouve";
        LettreStatut[LettreStatut["MalPlace"] = 1] = "MalPlace";
        LettreStatut[LettreStatut["BienPlace"] = 2] = "BienPlace";
    })(LettreStatut = exports.LettreStatut || (exports.LettreStatut = {}));
});
//# sourceMappingURL=lettreStatut.js.map