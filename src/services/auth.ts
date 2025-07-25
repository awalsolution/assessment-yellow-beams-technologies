import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '@/src/config/env';
import { HttpException } from '@/src/exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@/src/interfaces/auth';
import { User } from '@/src/interfaces/users';
import { UserModel } from '@/src/models/user';

const createToken = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = { _id: user._id };
  const expiresIn: number = 3600;

  return { expiresIn, token: jwt.sign(dataStoredInToken, JWT_SECRET_KEY, { expiresIn }) };
};

export class AuthService {
  static readonly instance = new AuthService();
  async register(userData: User): Promise<User> {
    const findUser: User = await UserModel.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createData = await UserModel.create({ ...userData, password: hashedPassword });

    return createData;
  }

  async login(userData: User) {
    const findUser = await UserModel.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

    const tokenData = createToken(findUser);
    return tokenData;
  }
}
