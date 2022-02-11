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
    exports.ClavierDisposition = void 0;
    var ClavierDisposition;
    (function (ClavierDisposition) {
        ClavierDisposition[ClavierDisposition["Azerty"] = 0] = "Azerty";
        ClavierDisposition[ClavierDisposition["B\u00E9po"] = 1] = "B\u00E9po";
        ClavierDisposition[ClavierDisposition["Qwerty"] = 2] = "Qwerty";
        ClavierDisposition[ClavierDisposition["Qwertz"] = 3] = "Qwertz";
    })(ClavierDisposition = exports.ClavierDisposition || (exports.ClavierDisposition = {}));
});
//# sourceMappingURL=clavierDisposition.js.map