export interface ResponseDto<T=void> {
    statusCode: number;
    message: string;
    data?: T;
}