export interface IParams {
  params: string[];
}

export interface IPayload {
  method: string;
  params?: unknown[] | Record<string, unknown>;
}
