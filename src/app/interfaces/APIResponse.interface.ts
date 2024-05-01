export interface IAPIResponse {
  message: string;
  data: any;
  statusCode?: number;
}

export class APIResponse implements IAPIResponse {
  message: string = "Ok";
  data: any = null;
  statusCode: number = 200;
}
