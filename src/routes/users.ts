import { Router } from 'express';
import { UserController } from '@/src/controllers/users';
import { CreateUserDto } from '@/src/dtos/users';
import { Routes } from '@/src/interfaces/routes';
import { ValidationMiddleware } from '@/src/middleware/validation';
import { AuthMiddleware } from '@/src/middleware/auth';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.userController.findAll);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.userController.findById);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateUserDto), this.userController.create);
    this.router.put(
      `${this.path}/:id`,
      AuthMiddleware,
      ValidationMiddleware(CreateUserDto, true),
      this.userController.update,
    );
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.userController.delete);
  }
}
