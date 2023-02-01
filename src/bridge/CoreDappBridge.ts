import {ISetup} from './ISetup';
import {CoreStream} from "./CoreStream";

class CoreDappBridge extends CoreStream {
  public readonly isCoreDapp = true;

  constructor(setup: ISetup) {
    super(setup);
  }
}

export default CoreDappBridge;
