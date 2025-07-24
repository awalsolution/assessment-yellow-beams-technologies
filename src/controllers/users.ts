import { NextFunction, Request, Response } from 'express';
import { User } from '@/src/interfaces/users';
import { UserService } from '@/src/services/users';

export class UserController {
  private userService: UserService;
  constructor() {
    this.userService = UserService.instance;
  }

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.userService.findAll();

      res.status(200).json({ status: true, data: findAllUsersData, message: 'Users find successfully!' });
    } catch (error) {
      next(error);
    }
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: User = await this.userService.findById(userId);

      res.status(200).json({ status: true, data: findOneUserData, message: 'User find successfully!' });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const createUserData: User = await this.userService.createUser(userData);

      res.status(201).json({ status: true, data: createUserData, message: 'User created successfully!' });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData: User = req.body;
      const updateUserData: User = await this.userService.updateUser(userId, userData);

      res.status(200).json({ status: true, data: updateUserData, message: 'User updated successfully!' });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: User = await this.userService.deleteUser(userId);

      res.status(200).json({ status: true, data: deleteUserData, message: 'User deleted successfully!' });
    } catch (error) {
      next(error);
    }
  };
}
