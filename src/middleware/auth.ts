import { NextFunction, Response } from 'express';
import jwt, { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '@/src/config/env';
import { HttpException } from '@/src/exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@/src/interfaces/auth';
import { UserModel } from '@/src/models/user';

export const AuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const bearerToken = req.header('Authorization');
    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.',
      });
    }

    if (!JWT_SECRET_KEY) {
      return res.status(500).json({
        success: false,
        message: 'JWT secret not configured',
      });
    }

    const token = bearerToken.replace('Bearer ', '').trim();
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as DataStoredInToken;
    const findUser = await UserModel.findById(decoded._id);

    if (!findUser) {
      return next(new HttpException(401, 'Wrong authentication token'));
    }

    req.user = findUser;
    next();
  } catch (error) {
    console.error('Authentication error:', error);

    if (error instanceof TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: 'Token has expired. Please log in again.',
      });
    }

    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Please log in again.',
      });
    }

    next(new HttpException(401, 'Authentication failed'));
  }
};
