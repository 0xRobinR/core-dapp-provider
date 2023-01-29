'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class InitProvider extends events_1.EventEmitter {
    constructor() {
        super();
        this.isCoreDapp = true;
    }
    // interact with flutter's inAppWebView handler
    _onMessage(listener, data) {
        window.coreDapp.handleThis({ listener, data });
    }
}
exports.default = InitProvider;
//# sourceMappingURL=InitProvider.js.map