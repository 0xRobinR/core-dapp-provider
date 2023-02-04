import {InitProvider, ISetup} from "../index";
import {IPayload} from "./IParams";
import {funcType} from "../providers/InitProvider";

export class CoreStream extends InitProvider {
  constructor(setup: ISetup) {
    super(setup);
  }

  request<T>(args: IPayload): Promise<funcType<T>> {
    return super.request(args);
  }
}
