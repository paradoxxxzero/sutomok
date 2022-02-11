var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define([
      "require",
      "exports",
      "./entites/configuration",
      "./sauvegardeur",
    ], factory);
  }
})(function (require, exports) {
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var configuration_1 = __importDefault(require("./entites/configuration"));
  var sauvegardeur_1 = __importDefault(require("./sauvegardeur"));
  var ReglesPanel = /** @class */ (function () {
    function ReglesPanel(panelManager) {
      var _this = this;
      this._panelManager = panelManager;
      this._rulesBouton = document.getElementById(
        "configuration-regles-bouton"
      );
      this._rulesBouton.addEventListener(
        "click",
        function () {
          _this.afficher();
        }.bind(this)
      );
    }
    ReglesPanel.prototype.afficher = function () {
      var titre = "Règles";
      var contenu =
        "<p>" +
        "Vous avez six essais pour deviner le mot du jour, entre 6 et 9 lettres, commun à tous.<br />" +
        "Vous ne pouvez proposer que des mots commençant par la même lettre que le mot recherché, et qui se trouvent dans notre dictionnaire.<br />" +
        "Le mot change chaque jour. Évitez donc les spoils et privilégiez le bouton de partage.<br />" +
        "</p>" +
        '<div class="grille">' +
        "<table>" +
        "<tr>" +
        '<td class="resultat bien-place">S</td>' +
        '<td class="resultat non-trouve">A</td>' +
        '<td class="resultat non-trouve">L</td>' +
        '<td class="resultat mal-place">E</td>' +
        '<td class="resultat mal-place">M</td>' +
        "</tr>" +
        "</table>" +
        "Les lettres entourées d'un carré rouge sont bien placées,<br />" +
        "les lettres entourées d'un cercle jaune sont mal placées (mais présentes dans le mot).<br />" +
        "Les lettres qui restent sur fond bleu ne sont pas dans le mot.<br />" +
        "</div>" +
        "<p>" +
        'En cas de soucis, vous pouvez contacter <a href="https://twitter.com/Jonamaths">@Jonamaths</a> sur twitter. −' +
        '<a target="_blank" href="https://framagit.org/JonathanMM/sutom">Page du projet</a><br />' +
        'Basé sur l\'excellent <a target="_blank" href="https://www.powerlanguage.co.uk/wordle/">Wordle</a> et le regretté Motus.<br />' +
        "Merci à Emmanuel pour l'aide sur les mots à trouver, et à GaranceAmarante pour l'aide sur le dictionnaire." +
        "</p>";
      this._panelManager.setContenu(titre, contenu);
      this._panelManager.setClasses(["regles-panel"]);
      this._panelManager.setCallbackFermeture(function () {
        var _a;
        sauvegardeur_1.default.sauvegarderConfig(
          __assign(
            __assign(
              {},
              (_a = sauvegardeur_1.default.chargerConfig()) !== null &&
                _a !== void 0
                ? _a
                : configuration_1.default.Default
            ),
            { afficherRegles: false }
          )
        );
      });
      this._panelManager.afficherPanel();
    };
    return ReglesPanel;
  })();
  exports.default = ReglesPanel;
});
//# sourceMappingURL=reglesPanel.js.map
