var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./entites/lettreStatut", "./entites/clavierDisposition", "./entites/configuration"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var lettreStatut_1 = require("./entites/lettreStatut");
    var clavierDisposition_1 = require("./entites/clavierDisposition");
    var configuration_1 = __importDefault(require("./entites/configuration"));
    var Input = /** @class */ (function () {
        function Input(gestionnaire, configuration, longueurMot, premiereLettre) {
            var _a;
            this._grille = document.getElementById("grille");
            this._inputArea = document.getElementById("input-area");
            this._premiereLettre = premiereLettre;
            this._longueurMot = longueurMot;
            this._gestionnaire = gestionnaire;
            this._motSaisi = "";
            this._estBloque = false;
            this._resultats = new Array();
            this.ajouterEvenementClavierPhysique();
            this.dessinerClavier((_a = configuration.disposition) !== null && _a !== void 0 ? _a : configuration_1.default.Default.disposition);
        }
        Input.prototype.dessinerClavier = function (disposition) {
            var clavier = this.getDisposition(disposition);
            this._inputArea.innerHTML = "";
            for (var _i = 0, clavier_1 = clavier; _i < clavier_1.length; _i++) {
                var ligne = clavier_1[_i];
                var ligneDiv = document.createElement("div");
                ligneDiv.className = "input-ligne";
                for (var _a = 0, ligne_1 = ligne; _a < ligne_1.length; _a++) {
                    var lettre = ligne_1[_a];
                    var lettreDiv = document.createElement("div");
                    lettreDiv.className = "input-lettre";
                    switch (lettre) {
                        case "_effacer":
                            lettreDiv.dataset["lettre"] = lettre;
                            lettreDiv.innerText = "⌫";
                            break;
                        case "_entree":
                            lettreDiv.innerText = "↲";
                            lettreDiv.dataset["lettre"] = lettre;
                            lettreDiv.classList.add("input-lettre-entree");
                            break;
                        case "_vide":
                            lettreDiv.classList.add("input-lettre-vide");
                            break;
                        case "_videdouble":
                            lettreDiv.classList.add("input-lettre-vide-double");
                            break;
                        default:
                            lettreDiv.dataset["lettre"] = lettre;
                            lettreDiv.innerText = lettre;
                    }
                    ligneDiv.appendChild(lettreDiv);
                }
                this._inputArea.appendChild(ligneDiv);
            }
            this.ajouterEvenementClavierVirtuel();
            this.updateClavier(this._resultats);
        };
        Input.prototype.getDisposition = function (clavier) {
            switch (clavier) {
                case clavierDisposition_1.ClavierDisposition.Bépo:
                    return [
                        ["B", "E", "P", "O", "V", "D", "L", "J", "Z", "W"],
                        ["A", "U", "I", "E", "C", "T", "S", "R", "N", "M"],
                        ["Y", "X", "K", "Q", "G", "H", "F", "_effacer", "_entree"],
                    ];
                case clavierDisposition_1.ClavierDisposition.Qwerty:
                    return [
                        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
                        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
                        ["_vide", "Z", "X", "C", "V", "B", "N", "M", "_effacer", "_entree"],
                    ];
                case clavierDisposition_1.ClavierDisposition.Qwertz:
                    return [
                        ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P"],
                        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
                        ["_vide", "Y", "X", "C", "V", "B", "N", "M", "_effacer", "_entree"],
                    ];
                default:
                    return [
                        ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
                        ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
                        ["_videdouble", "W", "X", "C", "V", "B", "N", "_effacer", "_entree"],
                    ];
            }
        };
        Input.prototype.ajouterEvenementClavierVirtuel = function () {
            var _this = this;
            this._inputArea.querySelectorAll(".input-lettre").forEach(function (lettreDiv) {
                return lettreDiv.addEventListener("click", function (event) {
                    event.stopPropagation();
                    var div = event.currentTarget;
                    if (!div)
                        return;
                    var lettre = div.dataset["lettre"];
                    if (lettre === undefined) {
                        return;
                    }
                    else if (lettre === "_effacer") {
                        _this.effacerLettre();
                    }
                    else if (lettre === "_entree") {
                        _this.validerMot();
                    }
                    else {
                        _this.saisirLettre(lettre);
                    }
                });
            });
        };
        Input.prototype.ajouterEvenementClavierPhysique = function () {
            var _this = this;
            document.addEventListener("keypress", (function (event) {
                event.stopPropagation();
                var touche = event.key;
                if (touche === "Enter") {
                    _this.validerMot();
                }
                else if (touche !== "Backspace") {
                    _this.saisirLettre(touche);
                }
            }).bind(this));
            // Le retour arrière n'est détecté que par keydown
            document.addEventListener("keydown", (function (event) {
                event.stopPropagation();
                var touche = event.key;
                if (touche === "Backspace") {
                    _this.effacerLettre();
                }
            }).bind(this));
        };
        Input.prototype.effacerLettre = function () {
            if (this._estBloque)
                return;
            if (this._motSaisi.length !== 0) {
                this._motSaisi = this._motSaisi.substring(0, this._motSaisi.length - 1);
            }
            this._gestionnaire.actualiserAffichage(this._motSaisi);
        };
        Input.prototype.validerMot = function () {
            if (this._estBloque)
                return;
            var mot = this._motSaisi;
            this._gestionnaire.verifierMot(mot);
            if (mot.length === this._longueurMot) {
                this._motSaisi = "";
            }
        };
        Input.prototype.saisirLettre = function (lettre) {
            if (this._estBloque)
                return;
            if (this._motSaisi.length >= this._longueurMot)
                return;
            if (this._motSaisi.length === 0 && lettre.toUpperCase() !== this._premiereLettre)
                this._motSaisi += this._premiereLettre;
            this._motSaisi += lettre;
            this._gestionnaire.actualiserAffichage(this._motSaisi);
        };
        Input.prototype.bloquer = function () {
            this._estBloque = true;
        };
        Input.prototype.updateClavier = function (resultats) {
            this._resultats = resultats; // On sauvegarde au cas où on doit redessiner tout le clavier
            var statutLettres = {};
            // console.log(statutLettres);
            for (var _i = 0, resultats_1 = resultats; _i < resultats_1.length; _i++) {
                var resultat = resultats_1[_i];
                if (!statutLettres[resultat.lettre])
                    statutLettres[resultat.lettre] = resultat.statut;
                else {
                    switch (resultat.statut) {
                        case lettreStatut_1.LettreStatut.BienPlace:
                            statutLettres[resultat.lettre] = lettreStatut_1.LettreStatut.BienPlace;
                            break;
                        case lettreStatut_1.LettreStatut.MalPlace:
                            if (statutLettres[resultat.lettre] !== lettreStatut_1.LettreStatut.BienPlace) {
                                statutLettres[resultat.lettre] = lettreStatut_1.LettreStatut.MalPlace;
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
            // console.log(statutLettres);
            var touches = this._inputArea.querySelectorAll(".input-lettre");
            for (var lettre in statutLettres) {
                var statut = statutLettres[lettre];
                for (var numTouche = 0; numTouche < touches.length; numTouche++) {
                    var touche = touches.item(numTouche);
                    if (touche === undefined || touche === null)
                        continue;
                    if (touche.dataset["lettre"] === lettre) {
                        // console.log(lettre + " => " + statut);
                        switch (statut) {
                            case lettreStatut_1.LettreStatut.BienPlace:
                                touche.className = "";
                                touche.classList.add("input-lettre");
                                touche.classList.add("lettre-bien-place");
                                break;
                            case lettreStatut_1.LettreStatut.MalPlace:
                                if (touche.classList.contains("lettre-bien-place"))
                                    break;
                                touche.className = "";
                                touche.classList.add("input-lettre");
                                touche.classList.add("lettre-mal-place");
                                break;
                            default:
                                if (touche.classList.contains("lettre-bien-place"))
                                    break;
                                if (touche.classList.contains("lettre-mal-place"))
                                    break;
                                touche.className = "";
                                touche.classList.add("input-lettre");
                                touche.classList.add("lettre-non-trouve");
                                break;
                        }
                    }
                }
            }
        };
        return Input;
    }());
    exports.default = Input;
});
//# sourceMappingURL=input.js.map