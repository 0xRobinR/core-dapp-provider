/// <reference types="node" />
import { EventEmitter } from 'events';
import { InitProviderTypes } from './InitProviderTypes';
declare global {
    interface Window {
        coreDapp: any;
    }
}
declare class InitProvider extends EventEmitter implements InitProviderTypes {
    isCoreDapp: boolean;
    address: string | undefined;
    provider: string | undefined;
    chainId: string | undefined;
    constructor();
    _onMessage(listener: string, data: object): void;
}
export default InitProvider;
