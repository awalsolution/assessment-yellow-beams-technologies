import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '@/src/config/env';
import { HttpException } from '@/src/exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@/src/interfaces/auth';
import { UserModel } from '@/src/models/user';

export const AuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const bearerToken = req.header('Authorization');
    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.',
      });
      return;
    }

    if (!SECRET_KEY) {
      res.status(500).json({
        success: false,
        message: 'JWT secret not configured',
      });
      return;
    }

    if (bearerToken) {
      const token = bearerToken.replace('Bearer ', '').trim();
      const decoded = jwt.verify(token, SECRET_KEY) as DataStoredInToken;
      const findUser = await UserModel.findById(decoded._id);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};
