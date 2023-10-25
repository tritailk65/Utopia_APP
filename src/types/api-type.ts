export interface Response<T> {
    Status: number;
    Message: string;
    Exception: string;
    Data: T;
}

export interface DataList<T> {
    items: T;
    totalRecords: number;
}
