"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreUtils = void 0;
const buffer_1 = require("buffer");
class CoreUtils {
    static convertToBytes(payload) {
        let buf = buffer_1.Buffer.from([]);
        try {
            if (typeof payload === 'string') {
                buf = buffer_1.Buffer.from(payload.replace('0x', ''), 'hex');
            }
            else {
                buf = buffer_1.Buffer.from(payload);
            }
        }
        catch (e) {
            throw new Error('error while encoding payload data');
        }
        return buf;
    }
    static payloadInHex(buf) {
        return '0x' + buffer_1.Buffer.from(buf).toString('hex');
    }
}
exports.CoreUtils = CoreUtils;
//# sourceMappingURL=index.js.map