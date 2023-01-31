import {InitProvider, ISetup} from "../index";
import {EventEmitter} from "events";
import {JsonRpcMiddleware} from "json-rpc-engine";
import {Duplex} from "stream";
import {createStreamMiddleware} from "json-rpc-middleware-stream";
import pump from 'pump'

export interface JsonRpcConnection {
  events: EventEmitter;
  middleware: JsonRpcMiddleware<unknown, unknown>;
  stream: Duplex;
}

export class CoreStream extends InitProvider {
  protected _jsonRpcConnection: JsonRpcConnection;

  constructor(setup: ISetup) {
    super(setup);
    this._jsonRpcConnection = createStreamMiddleware()

    pump(
      this._jsonRpcConnection.stream,
      this._handleOnDisconnect.bind(this)
    )

    this.rpcEngine.push(this._jsonRpcConnection.middleware);

    this._jsonRpcConnection.events.on('notification', (payload) => {
      const { method, params } = payload;
      if (method === 'accountsChanged') {
        this._handleAccountsChanged(params);
      } else if (method === 'chainChanged') {
        this.handleChainChange(params);
      }
    });
  }
}
