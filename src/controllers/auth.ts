import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '@/src/interfaces/auth';
import { User } from '@/src/interfaces/users';
import { AuthService } from '@/src/services/auth';

export class AuthController {
  auth: AuthService;

  constructor() {
    this.auth = AuthService.instance;
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const signUpUserData: User = await this.auth.register(userData);
      res.status(201).json({ data: signUpUserData, message: 'Register Successfully!' });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const response = await this.auth.login(userData);

      res.status(200).json({ status: true, data: response, message: 'Login Successfully!' });
    } catch (error) {
      next(error);
    }
  };

  authenticated = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const user: User = req.user;

      res.status(200).json({ status: true, data: user, message: 'User find Successfully!' });
    } catch (error) {
      next(error);
    }
  };
}
