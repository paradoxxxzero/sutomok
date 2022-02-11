(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./clavierDisposition", "./theme", "./volumeSon"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var clavierDisposition_1 = require("./clavierDisposition");
    var theme_1 = require("./theme");
    var volumeSon_1 = require("./volumeSon");
    var Configuration = /** @class */ (function () {
        function Configuration() {
            this.hasAudio = false;
            this.afficherRegles = true;
            this.volumeSon = volumeSon_1.VolumeSon.Normal;
            this.disposition = clavierDisposition_1.ClavierDisposition.Azerty;
            this.theme = theme_1.Theme.Sombre;
        }
        Configuration.Default = {
            hasAudio: false,
            afficherRegles: true,
            volumeSon: volumeSon_1.VolumeSon.Normal,
            disposition: clavierDisposition_1.ClavierDisposition.Azerty,
            theme: theme_1.Theme.Sombre,
        };
        return Configuration;
    }());
    exports.default = Configuration;
});
//# sourceMappingURL=configuration.js.map