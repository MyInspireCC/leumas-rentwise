export class ApiResponse<T> {
  constructor(
    public success: boolean,
    public message: string,
    public data?: T,
    public meta?: any,
  ) {}

  static success<T>(message: string, data?: T, meta?: any) {
    return new ApiResponse(true, message, data, meta);
  }

  static error(message: string, data?: any) {
    return new ApiResponse(false, message, data);
  }
}