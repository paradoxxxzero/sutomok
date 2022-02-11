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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./entites/configuration", "./sauvegardeur"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var configuration_1 = __importDefault(require("./entites/configuration"));
    var sauvegardeur_1 = __importDefault(require("./sauvegardeur"));
    var AudioPanel = /** @class */ (function () {
        function AudioPanel(configuration) {
            var _this = this;
            var _a;
            this._longueurSon = 220;
            this._hasAudio = false;
            this._configAudioBouton = document.getElementById("configuration-audio-bouton");
            this._iconeAudio = document.getElementById("configuration-audio-icone");
            this._audioLettreBienPlace = document.getElementById("son-lettre-bien-place");
            this._audioLettreMalPlace = document.getElementById("son-lettre-mal-place");
            this._audioLettreNonTrouve = document.getElementById("son-lettre-non-trouve");
            this.setVolumeSonore((_a = configuration.volumeSon) !== null && _a !== void 0 ? _a : configuration_1.default.Default.volumeSon);
            this.toggleSon(configuration.hasAudio, true);
            this._configAudioBouton.addEventListener("click", (function (event) {
                var _a;
                event.stopPropagation();
                _this.toggleSon(!_this._hasAudio);
                sauvegardeur_1.default.sauvegarderConfig(__assign(__assign({}, ((_a = sauvegardeur_1.default.chargerConfig()) !== null && _a !== void 0 ? _a : configuration_1.default.Default)), { hasAudio: _this._hasAudio }));
                _this._configAudioBouton.blur();
            }).bind(this));
        }
        AudioPanel.prototype.toggleSon = function (hasAudio, chargement) {
            if (chargement === void 0) { chargement = false; }
            this._hasAudio = hasAudio;
            if (!hasAudio) {
                this._iconeAudio.innerHTML = '<use href="#icone-son-desactive" fill="var(--couleur-icone)"></use>';
            }
            else {
                this._iconeAudio.innerHTML = '<use href="#icone-son-active" fill="var(--couleur-icone)"></use>';
                this._audioLettreBienPlace.preload = "auto";
                if (!chargement)
                    this.jouerSonLettreBienPlace();
                this._audioLettreMalPlace.preload = "auto";
                this._audioLettreNonTrouve.preload = "auto";
            }
        };
        AudioPanel.prototype.setVolumeSonore = function (volume) {
            var volumeTag = volume / 100;
            this._audioLettreBienPlace.volume = volumeTag;
            this._audioLettreMalPlace.volume = volumeTag;
            this._audioLettreNonTrouve.volume = volumeTag;
        };
        AudioPanel.prototype.jouerSonLettreBienPlace = function (callback) {
            this.jouerSon(this._audioLettreBienPlace, callback);
        };
        AudioPanel.prototype.jouerSonLettreMalPlace = function (callback) {
            this.jouerSon(this._audioLettreMalPlace, callback);
        };
        AudioPanel.prototype.jouerSonLettreNonTrouve = function (callback) {
            this.jouerSon(this._audioLettreNonTrouve, callback);
        };
        AudioPanel.prototype.jouerSon = function (baliseAudio, callback) {
            var _this = this;
            if (!this._hasAudio) {
                if (callback)
                    setTimeout(callback, this._longueurSon);
                return;
            }
            baliseAudio.currentTime = 0;
            if (callback)
                baliseAudio.addEventListener("ended", callback, { once: true });
            try {
                baliseAudio.play().catch((function () {
                    _this._hasAudio = false;
                    if (callback)
                        setTimeout(callback, _this._longueurSon);
                }).bind(this));
            }
            catch (ex // Parfois, le play ne retourne pas de promise…
            ) {
                this._hasAudio = false;
                if (callback)
                    setTimeout(callback, this._longueurSon);
            }
        };
        return AudioPanel;
    }());
    exports.default = AudioPanel;
});
//# sourceMappingURL=audioPanel.js.map