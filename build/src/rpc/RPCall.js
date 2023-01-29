"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RPCall {
    constructor(_url) {
        this.url = _url;
    }
    getBlockNumber() {
        return this.call({
            jsonrpc: '2.0',
            method: 'eth_blockNumber',
            params: [],
        }).then(json => json.result);
    }
    getBlockByNumber(number) {
        return this.call({
            jsonrpc: '2.0',
            method: 'eth_getBlockByNumber',
            params: [number, false],
        }).then((json) => json.result);
    }
    getFilterLogs(filter) {
        return this.call({ jsonrpc: '2.0', method: 'eth_getLogs', params: [filter] });
    }
    call(payload) {
        return fetch(this.url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json())
            .then((json) => {
            if (!json.result && json.error) {
                console.log('<== rpc error', json.error);
                throw new Error(json.error.message || 'rpc error');
            }
            return json;
        });
    }
}
exports.default = RPCall;
//# sourceMappingURL=RPCall.js.map