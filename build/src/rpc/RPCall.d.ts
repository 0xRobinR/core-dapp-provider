interface RPCall {
    url: string;
}
declare class RPCall implements RPCall {
    constructor(_url: string);
    getBlockNumber(): Promise<any>;
    getBlockByNumber(number: number): Promise<any>;
    getFilterLogs(filter: any): Promise<any>;
    call(payload: any): Promise<any>;
}
export default RPCall;
