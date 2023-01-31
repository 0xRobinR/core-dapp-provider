'use strict';

import {EventEmitter} from 'events';
import {InitProviderTypes} from './InitProviderTypes';
import {JsonRpcEngine, JsonRpcId, JsonRpcRequest, JsonRpcSuccess, JsonRpcVersion} from 'json-rpc-engine';
import {IParams, IPayload} from "../bridge/IParams";
import {ethErrors} from "eth-rpc-errors";
import {CoreUtils, getRpcPromiseCallback} from "../core-utils";
import isUtf8 from "isutf8";
import {ISetup} from "../bridge/ISetup";

declare global {
  interface Window {
    coreDapp: any;
  }
}
type funcType<T> = T | undefined;

export interface NonValidatedRequest {
  id?: JsonRpcId;
  jsonrpc?: JsonRpcVersion;
  method: string;
  params?: unknown;
}

abstract class InitProvider extends EventEmitter implements InitProviderTypes {
  public address: string | undefined;
  public provider: string | undefined;
  public chainId: string | undefined;
  protected rpcEngine: JsonRpcEngine;
  protected _isConnected: boolean;

  protected constructor(setup: ISetup) {
    super();
    this.rpcEngine = new JsonRpcEngine();
    this._initState(setup);
    this._isConnected = true;
  }

  private _initState(setup: ISetup) {
    this.address = setup.currentAddress;
    this.provider = setup.currentProvider;
    this.chainId = setup.chainId;
  }

  isConnected():boolean {
    return this._isConnected;
  }

  // interact with flutter's inAppWebView handler
  _onMessage(listener: string, data: object) {
    window.coreDapp.handleThis({listener, data});
  }

  request<T>(args: IPayload): Promise<funcType<T>> {
    if (!args || typeof args !== 'object' || Array.isArray(args)) {
      throw ethErrors.rpc.invalidRequest({
        message: "invalid request, method cannot be empty",
        data: args,
      });
    }

    const { method, params } = args;

    if (
      params !== undefined &&
      !Array.isArray(params) &&
      (typeof params !== 'object' || params === null)
    ) {
      throw ethErrors.rpc.invalidRequest({
        message: "invalid parameters passed",
        data: args,
      });
    }
    return new Promise<T>((resolve, reject) => {
      this._rpcRequest({method, params}, getRpcPromiseCallback(resolve, reject));
    })
  }

  protected _rpcRequest(payload: NonValidatedRequest | NonValidatedRequest[], callback: ( ...args: any[]) => void) {
    let _callBack = callback;

    if (!Array.isArray(payload)) {
      if (!payload.jsonrpc) {
        payload.jsonrpc = '2.0';
      }

      if (
        payload.method === 'eth_accounts' ||
        payload.method === 'eth_requestAccounts'
      ) {
        // handle accounts changing
        _callBack = (err: Error, res: JsonRpcSuccess<string[]>) => {
          this._handleAccountsChanged(
            res.result || []
          );
          callback(err, res);
        };
      }
      return this.rpcEngine.handle(payload as JsonRpcRequest<unknown>, _callBack);
    }
    return this.rpcEngine.handle(payload as JsonRpcRequest<unknown>[], _callBack);
  }

  protected _handleAccountsChanged(
    accounts: (string | undefined)[]
  ): void {
    this.emit('accountsChanged', accounts);
    this.address = accounts[0]
  }

  // ethereum rpc calls
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

  handleChainChange(chainId: string) {
    this.emit('connect', {chainId});
    this._onChainChanged(chainId);
  }

  protected _onChainChanged(chainId: string) {
    this.emit('chainChanged', chainId); // chain change event emitter
    this.emit('networkChanged', chainId); // legacy emitter
    this.chainId = chainId;
  }

  protected _handleOnDisconnect(){
    this.address = undefined;
    this._isConnected = false;
  }
}

export default InitProvider;
