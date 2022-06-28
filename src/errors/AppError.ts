

export class AppError {

    public readonly message: string;
    public readonly error: boolean;
    public readonly statusCode: number;

    constructor(message: string, statusCode = 400) {
        this.error = true;
        this.message = message;
        this.statusCode = statusCode;
    }

}