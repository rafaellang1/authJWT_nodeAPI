import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { InvalidCredentials } from '../errors/InvalidCredentials';
import { env } from '../config/env';
import { prismaClient } from '../libs/prismaClient';

interface IInput {
  email: string;
  password: string;
}

interface IOutput {
  accessToken: string
}

export class SignUpUseCase {
  async execute({ email, password }: IInput): Promise<IOutput> {

    const account = await prismaClient.account.findUnique({
      where: { email },
    });

    if (!account) {
      throw new InvalidCredentials();
    }

    const isPasswordValid = await compare(password, account.password);

    if (!isPasswordValid) {
      throw new InvalidCredentials();
    }

    const accessToken = sign(
      { sub: account.id },
      env.jwtSecret,
      { expiresIn: '1d' },
    );

    return {
      accessToken,
    };
  }
}
