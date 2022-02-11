var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./dictionnaire", "./grille", "./input", "./entites/lettreResultat", "./entites/lettreStatut", "./finDePartiePanel", "./notificationMessage", "./entites/sauvegardeStats", "./sauvegardeur", "./entites/configuration", "./entites/partieEnCours", "./panelManager", "./reglesPanel", "./configurationPanel", "./audioPanel", "./themeManager"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var dictionnaire_1 = __importDefault(require("./dictionnaire"));
    var grille_1 = __importDefault(require("./grille"));
    var input_1 = __importDefault(require("./input"));
    var lettreResultat_1 = __importDefault(require("./entites/lettreResultat"));
    var lettreStatut_1 = require("./entites/lettreStatut");
    var finDePartiePanel_1 = __importDefault(require("./finDePartiePanel"));
    var notificationMessage_1 = __importDefault(require("./notificationMessage"));
    var sauvegardeStats_1 = __importDefault(require("./entites/sauvegardeStats"));
    var sauvegardeur_1 = __importDefault(require("./sauvegardeur"));
    var configuration_1 = __importDefault(require("./entites/configuration"));
    var partieEnCours_1 = __importDefault(require("./entites/partieEnCours"));
    var panelManager_1 = __importDefault(require("./panelManager"));
    var reglesPanel_1 = __importDefault(require("./reglesPanel"));
    var configurationPanel_1 = __importDefault(require("./configurationPanel"));
    var audioPanel_1 = __importDefault(require("./audioPanel"));
    var themeManager_1 = __importDefault(require("./themeManager"));
    var Gestionnaire = /** @class */ (function () {
        function Gestionnaire() {
            var _this = this;
            var _a;
            this._grille = null;
            this._input = null;
            this._motATrouver = "";
            this._compositionMotATrouver = {};
            this._maxNbPropositions = 6;
            this._stats = sauvegardeStats_1.default.Default;
            this._config = configuration_1.default.Default;
            this._config = (_a = sauvegardeur_1.default.chargerConfig()) !== null && _a !== void 0 ? _a : this._config;
            var partieEnCours = this.chargerPartieEnCours();
            if (partieEnCours.datePartie) {
                this._datePartieEnCours = partieEnCours.datePartie;
            }
            else {
                this._datePartieEnCours = new Date();
            }
            this._dictionnaire = new dictionnaire_1.default();
            this._propositions = new Array();
            this._resultats = new Array();
            this._audioPanel = new audioPanel_1.default(this._config);
            this._panelManager = new panelManager_1.default();
            this._themeManager = new themeManager_1.default(this._config);
            this._reglesPanel = new reglesPanel_1.default(this._panelManager);
            this._finDePartiePanel = new finDePartiePanel_1.default(this._datePartieEnCours, this._panelManager);
            this._configurationPanel = new configurationPanel_1.default(this._panelManager, this._audioPanel, this._themeManager);
            this.choisirMot(this._datePartieEnCours).then(function (mot) {
                _this._motATrouver = mot;
                _this._grille = new grille_1.default(_this._motATrouver.length, _this._maxNbPropositions, _this._motATrouver[0], _this._audioPanel);
                _this._input = new input_1.default(_this, _this._config, _this._motATrouver.length, _this._motATrouver[0]);
                _this._configurationPanel.setInput(_this._input);
                _this._compositionMotATrouver = _this.decompose(_this._motATrouver);
                _this.chargerPropositions(partieEnCours.propositions);
            });
            this.afficherReglesSiNecessaire();
        }
        Gestionnaire.prototype.chargerPartieEnCours = function () {
            var _a;
            this._stats = (_a = sauvegardeur_1.default.chargerSauvegardeStats()) !== null && _a !== void 0 ? _a : sauvegardeStats_1.default.Default;
            var sauvegardePartieEnCours = sauvegardeur_1.default.chargerSauvegardePartieEnCours();
            if (sauvegardePartieEnCours)
                return sauvegardePartieEnCours;
            return new partieEnCours_1.default();
        };
        Gestionnaire.prototype.chargerPropositions = function (propositions) {
            if (!propositions || propositions.length === 0)
                return;
            for (var _i = 0, propositions_1 = propositions; _i < propositions_1.length; _i++) {
                var mot = propositions_1[_i];
                this.verifierMot(mot, true);
            }
        };
        Gestionnaire.prototype.enregistrerPartieDansStats = function () {
            this._stats.partiesJouees++;
            var estVictoire = this._resultats.some(function (resultat) { return resultat.every(function (item) { return item.statut === lettreStatut_1.LettreStatut.BienPlace; }); });
            if (estVictoire) {
                this._stats.partiesGagnees++;
                var nbEssais = this._resultats.length;
                if (nbEssais >= 1 && nbEssais <= 6) {
                    this._stats.repartition[nbEssais]++;
                }
            }
            else {
                this._stats.repartition["-"]++;
            }
            this._stats.lettresRepartitions.bienPlace += this._resultats.reduce(function (accumulateur, mot) {
                accumulateur += mot.filter(function (item) { return item.statut == lettreStatut_1.LettreStatut.BienPlace; }).length;
                return accumulateur;
            }, 0);
            this._stats.lettresRepartitions.malPlace += this._resultats.reduce(function (accumulateur, mot) {
                accumulateur += mot.filter(function (item) { return item.statut == lettreStatut_1.LettreStatut.MalPlace; }).length;
                return accumulateur;
            }, 0);
            this._stats.lettresRepartitions.nonTrouve += this._resultats.reduce(function (accumulateur, mot) {
                accumulateur += mot.filter(function (item) { return item.statut == lettreStatut_1.LettreStatut.NonTrouve; }).length;
                return accumulateur;
            }, 0);
            this._stats.dernierePartie = this._datePartieEnCours;
            sauvegardeur_1.default.sauvegarderStats(this._stats);
        };
        Gestionnaire.prototype.sauvegarderPartieEnCours = function () {
            sauvegardeur_1.default.sauvegarderPartieEnCours(this._propositions, this._datePartieEnCours);
        };
        Gestionnaire.prototype.choisirMot = function (datePartie) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _b = (_a = this._dictionnaire).nettoyerMot;
                            return [4 /*yield*/, this._dictionnaire.getMot(datePartie)];
                        case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                    }
                });
            });
        };
        Gestionnaire.prototype.decompose = function (mot) {
            var composition = {};
            for (var position = 0; position < mot.length; position++) {
                var lettre = mot[position];
                if (composition[lettre])
                    composition[lettre]++;
                else
                    composition[lettre] = 1;
            }
            return composition;
        };
        Gestionnaire.prototype.verifierMot = function (mot, chargementPartie) {
            var _this = this;
            if (chargementPartie === void 0) { chargementPartie = false; }
            mot = this._dictionnaire.nettoyerMot(mot);
            //console.debug(mot + " => " + (this._dictionnaire.estMotValide(mot) ? "Oui" : "non"));
            if (mot.length !== this._motATrouver.length) {
                notificationMessage_1.default.ajouterNotification("Le mot proposé est trop court");
                return;
            }
            if (mot[0] !== this._motATrouver[0]) {
                notificationMessage_1.default.ajouterNotification("Le mot proposé doit commencer par la même lettre que le mot recherché");
                return;
            }
            if (mot !== this._motATrouver && !this._dictionnaire.estMotValide(mot)) {
                notificationMessage_1.default.ajouterNotification("Ce mot n'est pas dans notre dictionnaire");
                return;
            }
            if (!this._datePartieEnCours)
                this._datePartieEnCours = new Date();
            var resultats = this.analyserMot(mot);
            var isBonneReponse = resultats.every(function (item) { return item.statut === lettreStatut_1.LettreStatut.BienPlace; });
            this._propositions.push(mot);
            this._resultats.push(resultats);
            if (isBonneReponse || this._propositions.length === this._maxNbPropositions) {
                this._finDePartiePanel.genererResume(isBonneReponse, this._motATrouver, this._resultats);
                if (!chargementPartie)
                    this.enregistrerPartieDansStats();
            }
            if (this._grille)
                this._grille.validerMot(mot, resultats, isBonneReponse, chargementPartie, function () {
                    if (_this._input) {
                        _this._input.updateClavier(resultats);
                        if (isBonneReponse || _this._propositions.length === _this._maxNbPropositions) {
                            _this._input.bloquer();
                            _this._finDePartiePanel.afficher();
                        }
                    }
                });
            this.sauvegarderPartieEnCours();
        };
        Gestionnaire.prototype.actualiserAffichage = function (mot) {
            if (this._grille)
                this._grille.actualiserAffichage(this._dictionnaire.nettoyerMot(mot));
        };
        Gestionnaire.prototype.analyserMot = function (mot) {
            var resultats = new Array();
            mot = mot.toUpperCase();
            var composition = __assign({}, this._compositionMotATrouver);
            for (var position = 0; position < this._motATrouver.length; position++) {
                var lettreATrouve = this._motATrouver[position];
                var lettreProposee = mot[position];
                if (lettreATrouve === lettreProposee) {
                    composition[lettreProposee]--;
                }
            }
            for (var position = 0; position < this._motATrouver.length; position++) {
                var lettreATrouve = this._motATrouver[position];
                var lettreProposee = mot[position];
                var resultat = new lettreResultat_1.default();
                resultat.lettre = lettreProposee;
                if (lettreATrouve === lettreProposee) {
                    resultat.statut = lettreStatut_1.LettreStatut.BienPlace;
                }
                else if (this._motATrouver.includes(lettreProposee)) {
                    if (composition[lettreProposee] > 0) {
                        resultat.statut = lettreStatut_1.LettreStatut.MalPlace;
                        composition[lettreProposee]--;
                    }
                    else {
                        resultat.statut = lettreStatut_1.LettreStatut.NonTrouve;
                    }
                }
                else {
                    resultat.statut = lettreStatut_1.LettreStatut.NonTrouve;
                }
                resultats.push(resultat);
            }
            return resultats;
        };
        Gestionnaire.prototype.afficherReglesSiNecessaire = function () {
            if (this._config.afficherRegles !== undefined && !this._config.afficherRegles)
                return;
            this._reglesPanel.afficher();
        };
        return Gestionnaire;
    }());
    exports.default = Gestionnaire;
});
//# sourceMappingURL=gestionnaire.js.map