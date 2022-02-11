var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./entites/configuration", "./entites/theme"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var configuration_1 = __importDefault(require("./entites/configuration"));
    var theme_1 = require("./entites/theme");
    var ThemeManager = /** @class */ (function () {
        function ThemeManager(config) {
            var _a;
            this.changerCouleur((_a = config.theme) !== null && _a !== void 0 ? _a : configuration_1.default.Default.theme);
        }
        ThemeManager.prototype.changerCouleur = function (theme) {
            var root = document.documentElement;
            switch (theme) {
                case theme_1.Theme.Clair:
                    root.style.setProperty("--couleur-bien-place", "#e7002a");
                    root.style.setProperty("--couleur-mal-place", "#ffbd00");
                    root.style.setProperty("--couleur-fond-rgb", "255, 254, 246");
                    root.style.setProperty("--couleur-police", "#000000");
                    root.style.setProperty("--couleur-bordure", "#000000");
                    root.style.setProperty("--couleur-icone", "rgb(55, 55, 55)");
                    break;
                case theme_1.Theme.ClairAccessible:
                    root.style.setProperty("--couleur-bien-place", "#096800");
                    root.style.setProperty("--couleur-mal-place", "#db7c00");
                    root.style.setProperty("--couleur-fond-rgb", "255, 254, 246");
                    root.style.setProperty("--couleur-police", "#000000");
                    root.style.setProperty("--couleur-bordure", "#000000");
                    root.style.setProperty("--couleur-icone", "rgb(55, 55, 55)");
                    break;
                case theme_1.Theme.SombreAccessible:
                    root.style.setProperty("--couleur-bien-place", "#096800");
                    root.style.setProperty("--couleur-mal-place", "#db7c00");
                    root.style.setProperty("--couleur-fond-rgb", "43, 43, 43");
                    root.style.setProperty("--couleur-police", "#ffffff");
                    root.style.setProperty("--couleur-bordure", "#ffffff");
                    root.style.setProperty("--couleur-icone", "rgb(200, 200, 200)");
                    break;
                default:
                    root.style.setProperty("--couleur-bien-place", "#e7002a");
                    root.style.setProperty("--couleur-mal-place", "#ffbd00");
                    root.style.setProperty("--couleur-fond-rgb", "43, 43, 43");
                    root.style.setProperty("--couleur-police", "#ffffff");
                    root.style.setProperty("--couleur-bordure", "#ffffff");
                    root.style.setProperty("--couleur-icone", "rgb(200, 200, 200)");
            }
        };
        return ThemeManager;
    }());
    exports.default = ThemeManager;
});
//# sourceMappingURL=themeManager.js.map