import { Request, Response } from 'express';
import { IController } from '../../application/interfaces/iController';

export function routerAdapter(controller: IController) {
  return async ( request: Request, response: Response) => {
    const {statusCode, body } = await controller.handle({
      body: request.body,
      params: request.params
    });

    response.status(statusCode).json(body);
  };
}
