import InitProvider from '../providers/InitProvider';
import { ISetup } from './ISetup';
import { IParams } from './IParams';
declare class CoreDappBridge extends InitProvider {
    constructor(setup: ISetup);
    handleChainChange(chainId: string): void;
    onChainChanged(chainId: string): void;
    onConnect(chainId: string): void;
    eth_Accounts(): string[];
    eth_chainId(): string | undefined;
    eth_sign(payload: IParams): void;
}
export default CoreDappBridge;
