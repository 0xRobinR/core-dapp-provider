export interface IParams {
  params: string[];
}

export interface IPayload {
  id?: number;
  jsonrpc?: string;
  method: string;
  params?: unknown[] | Record<string, unknown>;
}
