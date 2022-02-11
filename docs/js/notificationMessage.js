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
    var NotificationMessage = /** @class */ (function () {
        function NotificationMessage() {
        }
        NotificationMessage.ajouterNotification = function (message) {
            this.ajouterNotificationDiv(this._notificationArea, message);
        };
        NotificationMessage.ajouterNotificationPanel = function (message) {
            this.ajouterNotificationDiv(this._notificationPanelArea, message);
        };
        NotificationMessage.ajouterNotificationDiv = function (div, message) {
            var _this = this;
            if (this._currentTimeout) {
                clearTimeout(this._currentTimeout);
                this._currentTimeout = undefined;
            }
            div.innerHTML = message;
            div.style.opacity = "1";
            this._currentTimeout = setTimeout((function () {
                div.style.opacity = "0";
                _this._currentTimeout = setTimeout((function () {
                    div.innerHTML = " ";
                    _this._currentTimeout = undefined;
                }).bind(_this), 1000);
            }).bind(this), 5000);
        };
        NotificationMessage._notificationArea = document.getElementById("notification");
        NotificationMessage._notificationPanelArea = document.getElementById("panel-fenetre-notification");
        return NotificationMessage;
    }());
    exports.default = NotificationMessage;
});
//# sourceMappingURL=notificationMessage.js.map