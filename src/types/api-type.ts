export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    code: number;
}

export interface DataList<T> {
    items: T;
    totalRecords: number;
}
