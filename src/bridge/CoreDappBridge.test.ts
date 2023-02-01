import {CoreDappBridge} from '../index';

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
  });
});
