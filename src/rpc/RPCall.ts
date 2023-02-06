import fetch from 'cross-fetch';

interface RPCall {
  url: string;
}

class RPCall implements RPCall {
  constructor(_url: string) {
    this.url = _url;
  }

  getBlockNumber() {
    return this.call({
      jsonrpc: '2.0',
      method: 'eth_blockNumber',
      params: [],
    }).then(json => json.result);
  }

  getBlockByNumber(number: number) {
    return this.call({
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: [number, false],
    }).then((json: any) => json.result);
  }

  getFilterLogs(filter: any) {
    return this.call({jsonrpc: '2.0', method: 'eth_getLogs', params: [filter]});
  }

  call(payload: any) {
    return fetch(this.url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response: any) => response.json())
      .then((json: any) => {
        if (!json.result && json.error) {
          console.log('<== rpc error', json.error);
          throw new Error(json.error.message || 'rpc error');
        }
        return json;
      });
  }
}

export default RPCall;
