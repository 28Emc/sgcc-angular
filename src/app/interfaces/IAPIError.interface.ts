export interface IAPIError {
  message: string;
  error: string;
  statusCode?: number;
}

export class APIError implements IAPIError {
  message: string = "There was an error";
  error: string = "Internal Server Error";
  statusCode: number = 500;
}
