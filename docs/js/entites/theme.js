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
    exports.Theme = void 0;
    var Theme;
    (function (Theme) {
        Theme[Theme["Sombre"] = 0] = "Sombre";
        Theme[Theme["Clair"] = 1] = "Clair";
        Theme[Theme["SombreAccessible"] = 2] = "SombreAccessible";
        Theme[Theme["ClairAccessible"] = 3] = "ClairAccessible";
    })(Theme = exports.Theme || (exports.Theme = {}));
});
//# sourceMappingURL=theme.js.map