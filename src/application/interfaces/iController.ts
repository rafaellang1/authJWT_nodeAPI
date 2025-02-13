export interface IRequest {
  body: Record<string, any>
}

export interface IController {
  handle(request: IRequest): Promise<IResponse>;
}
