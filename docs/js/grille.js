(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./entites/lettreStatut"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var lettreStatut_1 = require("./entites/lettreStatut");
    var Grille = /** @class */ (function () {
        function Grille(longueurMot, maxPropositions, indice, audioPanel) {
            this._grille = document.getElementById("grille");
            this._audioPanel = audioPanel;
            this._longueurMot = longueurMot;
            this._maxPropositions = maxPropositions;
            this._indice = new Array(longueurMot);
            this._indice[0] = indice;
            this._propositions = new Array();
            this._resultats = new Array();
            this._motActuel = 0;
            this.afficherGrille();
        }
        Grille.prototype.afficherGrille = function () {
            var table = document.createElement("table");
            for (var nbMot = 0; nbMot < this._maxPropositions; nbMot++) {
                var ligne = document.createElement("tr");
                var mot = this._propositions.length <= nbMot ? "" : this._propositions[nbMot];
                for (var nbLettre = 0; nbLettre < this._longueurMot; nbLettre++) {
                    var cellule = document.createElement("td");
                    var contenuCellule = "";
                    if (nbMot < this._motActuel || (nbMot === this._motActuel && mot.length !== 0)) {
                        if (mot.length <= nbLettre) {
                            contenuCellule = ".";
                        }
                        else {
                            contenuCellule = mot[nbLettre].toUpperCase();
                        }
                    }
                    else if (nbMot === this._motActuel) {
                        var lettreIndice = this._indice[nbLettre];
                        if (lettreIndice !== undefined)
                            contenuCellule = lettreIndice;
                        else
                            contenuCellule = ".";
                    }
                    if (this._resultats.length > nbMot && this._resultats[nbMot][nbLettre]) {
                        var resultat = this._resultats[nbMot][nbLettre];
                        var emoji = "🟦";
                        switch (resultat.statut) {
                            case lettreStatut_1.LettreStatut.BienPlace:
                                emoji = "🟥";
                                cellule.classList.add("bien-place", "resultat");
                                break;
                            case lettreStatut_1.LettreStatut.MalPlace:
                                emoji = "🟡";
                                cellule.classList.add("mal-place", "resultat");
                                break;
                            default:
                                emoji = "🟦";
                                cellule.classList.add("non-trouve", "resultat");
                        }
                        // console.log(resultat.lettre + " => " + emoji);
                    }
                    cellule.innerText = contenuCellule;
                    ligne.appendChild(cellule);
                }
                table.appendChild(ligne);
            }
            this._grille.innerHTML = "";
            this._grille.appendChild(table);
        };
        Grille.prototype.actualiserAffichage = function (mot) {
            this.saisirMot(this._motActuel, mot);
            this.afficherGrille();
        };
        Grille.prototype.validerMot = function (mot, resultats, isBonneReponse, skipAnimation, endCallback) {
            if (skipAnimation === void 0) { skipAnimation = false; }
            this.saisirMot(this._motActuel, mot);
            this.mettreAJourIndice(resultats);
            this._resultats.push(resultats);
            if (!skipAnimation)
                this.animerResultats(resultats, endCallback);
            if (isBonneReponse) {
                this.bloquerGrille();
            }
            else {
                this._motActuel++;
            }
            if (skipAnimation) {
                this.afficherGrille();
                if (endCallback)
                    endCallback();
            }
        };
        Grille.prototype.animerResultats = function (resultats, endCallback) {
            var table = this._grille.getElementsByTagName("table").item(0);
            if (table === null) {
                this.afficherGrille();
                if (endCallback)
                    endCallback();
                return;
            }
            var ligne = table.getElementsByTagName("tr").item(this._motActuel);
            if (ligne === null) {
                this.afficherGrille();
                if (endCallback)
                    endCallback();
                return;
            }
            var td = ligne.getElementsByTagName("td");
            this.animerLettre(td, resultats, 0, endCallback);
        };
        Grille.prototype.animerLettre = function (td, resultats, numLettre, endCallback) {
            var _this = this;
            if (numLettre >= td.length) {
                this.afficherGrille();
                if (endCallback)
                    endCallback();
                return;
            }
            var cellule = td[numLettre];
            var resultat = resultats[numLettre];
            cellule.innerHTML = resultat.lettre;
            var callback = (function () { return _this.animerLettre(td, resultats, numLettre + 1, endCallback); }).bind(this);
            switch (resultat.statut) {
                case lettreStatut_1.LettreStatut.BienPlace:
                    cellule.classList.add("bien-place", "resultat");
                    this._audioPanel.jouerSonLettreBienPlace(callback);
                    break;
                case lettreStatut_1.LettreStatut.MalPlace:
                    cellule.classList.add("mal-place", "resultat");
                    this._audioPanel.jouerSonLettreMalPlace(callback);
                    break;
                default:
                    cellule.classList.add("non-trouve", "resultat");
                    this._audioPanel.jouerSonLettreNonTrouve(callback);
            }
        };
        Grille.prototype.mettreAJourIndice = function (resultats) {
            for (var i = 0; i < this._indice.length; i++) {
                if (!this._indice[i]) {
                    this._indice[i] = resultats[i].statut === lettreStatut_1.LettreStatut.BienPlace ? resultats[i].lettre : undefined;
                }
            }
        };
        Grille.prototype.saisirMot = function (position, mot) {
            if (this._propositions.length <= position) {
                this._propositions.push("");
            }
            this._propositions[position] = mot;
        };
        Grille.prototype.bloquerGrille = function () { };
        return Grille;
    }());
    exports.default = Grille;
});
//# sourceMappingURL=grille.js.map