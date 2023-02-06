import {CoreDappBridge} from '../index';
import RPCall from "../rpc/RPCall";
import {IPayload} from "./IParams";

describe('CoreDappBridge', () => {
  describe('coreDappBridge chain change', () => {
    it('emits chain change event', () => {
      const iSetup = {
        currentProvider: 'ethereum',
        currentAddress: '0x0000000',
        chainId: '0x1',
      };
      const coreDappBridge = new CoreDappBridge(iSetup);
      // add listener on chain changed
      coreDappBridge.on('chainChanged', chainId => {
        expect(chainId).not.toBe(iSetup.chainId);
      });

      // change the chain
      coreDappBridge.handleChainChange('0x2');

      expect(coreDappBridge.chainId).toBe('0x2');
      expect(coreDappBridge.isCoreDapp).toBe(true);
    });

    it("runs without any error", async () => {
      const rpc = new RPCall("https://data-seed-prebsc-2-s3.binance.org:8545")
      const payload: IPayload = {
        method: "eth_gasPrice",
        params: [],
        jsonrpc: "2.0",
        id: 21992
      }
      const req = await rpc.call(payload)
      console.log(req)
    })
  });
});
