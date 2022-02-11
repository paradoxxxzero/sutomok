(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./lettreStatut"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var lettreStatut_1 = require("./lettreStatut");
    var LettreResultat = /** @class */ (function () {
        function LettreResultat() {
            this.lettre = "";
            this.statut = lettreStatut_1.LettreStatut.NonTrouve;
        }
        return LettreResultat;
    }());
    exports.default = LettreResultat;
});
//# sourceMappingURL=lettreResultat.js.map