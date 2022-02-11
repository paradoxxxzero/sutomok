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
    var Sauvegardeur = /** @class */ (function () {
        function Sauvegardeur() {
        }
        Sauvegardeur.sauvegarderStats = function (stats) {
            localStorage.setItem(this._cleStats, JSON.stringify(stats));
        };
        Sauvegardeur.chargerSauvegardeStats = function () {
            var dataStats = localStorage.getItem(this._cleStats);
            if (!dataStats)
                return;
            var stats = JSON.parse(dataStats);
            return stats;
        };
        Sauvegardeur.sauvegarderPartieEnCours = function (propositions, datePartie) {
            var partieEnCours = {
                propositions: propositions,
                datePartie: datePartie,
            };
            localStorage.setItem(this._clePartieEnCours, JSON.stringify(partieEnCours));
        };
        Sauvegardeur.chargerSauvegardePartieEnCours = function () {
            var dataPartieEnCours = localStorage.getItem(this._clePartieEnCours);
            if (!dataPartieEnCours)
                return;
            var partieEnCours = JSON.parse(dataPartieEnCours);
            var aujourdhui = new Date();
            var datePartieEnCours = new Date(partieEnCours.datePartie);
            if (aujourdhui.getDate() !== datePartieEnCours.getDate() ||
                aujourdhui.getMonth() !== datePartieEnCours.getMonth() ||
                aujourdhui.getFullYear() !== datePartieEnCours.getFullYear()) {
                localStorage.removeItem(this._clePartieEnCours);
                return;
            }
            return {
                datePartie: datePartieEnCours,
                propositions: partieEnCours.propositions,
            };
        };
        Sauvegardeur.sauvegarderConfig = function (config) {
            localStorage.setItem(this._cleConfiguration, JSON.stringify(config));
        };
        Sauvegardeur.chargerConfig = function () {
            var dataConfig = localStorage.getItem(this._cleConfiguration);
            if (!dataConfig)
                return null;
            var config = JSON.parse(dataConfig);
            return config;
        };
        Sauvegardeur._cleStats = "statistiques";
        Sauvegardeur._clePartieEnCours = "partieEnCours";
        Sauvegardeur._cleConfiguration = "configuration";
        return Sauvegardeur;
    }());
    exports.default = Sauvegardeur;
});
//# sourceMappingURL=sauvegardeur.js.map