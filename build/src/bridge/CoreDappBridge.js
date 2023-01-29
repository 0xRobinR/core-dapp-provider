"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InitProvider_1 = require("../providers/InitProvider");
const core_utils_1 = require("../core-utils");
const isutf8_1 = require("isutf8");
class CoreDappBridge extends InitProvider_1.default {
    constructor(setup) {
        super();
        this.isCoreDapp = true;
        this.address = setup.currentAddress;
    }
    onChainChanged(chainId) {
        this.emit('chainChanged', chainId); // chain change event emitter
        this.emit('networkChanged', chainId); // legacy emitter
    }
    onConnect(chainId) {
        this.emit('connect', { chainId });
    }
    eth_Accounts() {
        return this.address ? [this.address] : [];
    }
    eth_chainId() {
        return this.chainId;
    }
    eth_sign(payload) {
        const buffer = core_utils_1.CoreUtils.convertToBytes(payload.params[1]);
        const hex = core_utils_1.CoreUtils.payloadInHex(buffer);
        if ((0, isutf8_1.default)(buffer)) {
            this._onMessage('signPersonalMessage', { data: hex });
        }
        else {
            this._onMessage('signMessage', { data: hex });
        }
    }
}
exports.default = CoreDappBridge;
//# sourceMappingURL=CoreDappBridge.js.map