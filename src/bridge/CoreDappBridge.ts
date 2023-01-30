import InitProvider from '../providers/InitProvider';
import {ISetup} from './ISetup';
import {IParams} from './IParams';
import {CoreUtils} from '../core-utils';
import isUtf8 from 'isutf8';

class CoreDappBridge extends InitProvider {
  constructor(setup: ISetup) {
    super();
    this.isCoreDapp = true;
    this.address = setup.currentAddress;
    this.chainId = setup.chainId;
  }

  handleChainChange(chainId: string) {
    this.emit('connect', {chainId});
  }

  onChainChanged(chainId: string) {
    this.handleChainChange(chainId);
    this.emit('chainChanged', chainId); // chain change event emitter
    this.emit('networkChanged', chainId); // legacy emitter
    this.chainId = chainId;
  }

  onConnect(chainId: string) {
    this.emit('connect', {chainId});
  }

  eth_Accounts() {
    return this.address ? [this.address] : [];
  }

  eth_chainId() {
    return this.chainId;
  }

  eth_sign(payload: IParams) {
    const buffer = CoreUtils.convertToBytes(payload.params[1]);
    const hex = CoreUtils.payloadInHex(buffer);
    if (isUtf8(buffer)) {
      this._onMessage('signPersonalMessage', {data: hex});
    } else {
      this._onMessage('signMessage', {data: hex});
    }
  }
}

export default CoreDappBridge;
