import {Buffer} from 'buffer';
import {PendingJsonRpcResponse} from "json-rpc-engine";

export class CoreUtils {
  static convertToBytes(payload: string | any) {
    let buf = Buffer.from([]);
    try {
      if (typeof payload === 'string') {
        buf = Buffer.from(payload.replace('0x', ''), 'hex');
      } else {
        buf = Buffer.from(payload);
      }
    } catch (e) {
      throw new Error('error while encoding payload data');
    }
    return buf;
  }

  static payloadInHex(buf: string | any) {
    return '0x' + Buffer.from(buf).toString('hex');
  }
}

export const getRpcPromiseCallback = ( resolve: (value?: any) => void, reject: (error?: Error) => void, unwrapResult = true, ) =>
  (error: Error, response: PendingJsonRpcResponse<unknown>): void => {
  if (error || response.error) {
    reject(error || response.error);
  } else {
    !unwrapResult || Array.isArray(response)
    ? resolve(response)
    : resolve(response.result);
  }
};
