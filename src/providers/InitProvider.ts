'use strict';

import {EventEmitter} from 'events';
import {InitProviderTypes} from './InitProviderTypes';

declare global {
  interface Window {
    coreDapp: any;
  }
}

class InitProvider extends EventEmitter implements InitProviderTypes {
  public isCoreDapp: boolean;
  public address: string | undefined;
  public provider: string | undefined;
  public chainId: string | undefined;

  constructor() {
    super();
    this.isCoreDapp = true;
  }

  // interact with flutter's inAppWebView handler
  _onMessage(listener: string, data: object) {
    window.coreDapp.handleThis({listener, data});
  }
}

export default InitProvider;
