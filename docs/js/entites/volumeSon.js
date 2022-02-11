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
    exports.VolumeSon = void 0;
    var VolumeSon;
    (function (VolumeSon) {
        VolumeSon[VolumeSon["Faible"] = 30] = "Faible";
        VolumeSon[VolumeSon["Normal"] = 70] = "Normal";
        VolumeSon[VolumeSon["Fort"] = 100] = "Fort";
    })(VolumeSon = exports.VolumeSon || (exports.VolumeSon = {}));
});
//# sourceMappingURL=volumeSon.js.map