import { Router } from 'express';
import { CampaignsController } from '@/src/controllers/campaigns';
import { CreateUserDto } from '@/src/dtos/users';
import { Routes } from '@/src/interfaces/routes';
import { ValidationMiddleware } from '@/src/middleware/validation';
import { AuthMiddleware } from '@/src/middleware/auth';

export class UserRoute implements Routes {
  public path = '/campaigns';
  public router = Router();
  public campaignsController = new CampaignsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.campaignsController.findAll);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.campaignsController.findById);
    this.router.post(
      `${this.path}`,
      AuthMiddleware,
      ValidationMiddleware(CreateUserDto),
      this.campaignsController.create,
    );
    this.router.put(
      `${this.path}/:id`,
      AuthMiddleware,
      ValidationMiddleware(CreateUserDto, true),
      this.campaignsController.update,
    );
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.campaignsController.delete);
    this.router.post(`/ai-suggest `, AuthMiddleware, this.campaignsController.aiSuggest);
  }
}
