export type IParams = string[];

export interface IPayload {
  id?: number;
  jsonrpc?: string;
  method: string;
  params?: IParams
}
