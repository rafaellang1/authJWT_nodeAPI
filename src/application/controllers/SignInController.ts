import { z, ZodError } from 'zod';

import { IController, IRequest, IResponse } from '../interfaces/iController';
import { SignInUseCase } from '../useCases/SignInUseCase';
import { InvalidCredentials } from '../errors/InvalidCredentials';

//usando zod para validar os objetos
const schema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(8),
});

export class SignInController implements IController {
  constructor(private readonly SignInUseCase: SignInUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, password } = schema.parse(body);

      const { accessToken} = await this.SignInUseCase.execute({ email, password });

      return {
        statusCode: 204,
        body: {
          accessToken,
        },
      };

    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }

      if (error instanceof InvalidCredentials) {
        return {
          statusCode: 401,
          body: {
            error: 'Invalid Credentials',
          },
        };
      }

      throw error;
    }
  }
}
