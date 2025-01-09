export interface IError {
    msg?: string;
    field?: string;
    errorCode: number;
    errors?: any[]
}