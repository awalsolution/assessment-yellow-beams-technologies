import { Router } from 'express';
import { AuthController } from '@/src/controllers/auth';
import { CreateUserDto } from '@/src/dtos/users';
import { Routes } from '@/src/interfaces/routes';
import { AuthMiddleware } from '@/src/middleware/auth';
import { ValidationMiddleware } from '@/src/middleware/validation';

export class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, ValidationMiddleware(CreateUserDto), this.authController.register);
    this.router.post(`${this.path}/login`, ValidationMiddleware(CreateUserDto), this.authController.login);
    this.router.post(`${this.path}/me`, AuthMiddleware, this.authController.authenticated);
  }
}
