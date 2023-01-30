'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const json_rpc_engine_1 = require("json-rpc-engine");
class InitProvider extends events_1.EventEmitter {
    constructor() {
        super();
        this.isCoreDapp = true;
        this.rpcEngine = new json_rpc_engine_1.JsonRpcEngine();
    }
    // interact with flutter's inAppWebView handler
    _onMessage(listener, data) {
        window.coreDapp.handleThis({ listener, data });
    }
}
exports.default = InitProvider;
//# sourceMappingURL=InitProvider.js.map