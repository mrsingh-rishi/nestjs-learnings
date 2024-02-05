import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './auth.entity';
import { Model } from 'mongoose';
@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private authModel: Model<AuthDocument>) {}
  async signup(userData: any) {
    try {
      const existingUser = await this.authModel
        .findOne({
          username: userData.username,
        })
        .exec();

      if (existingUser) {
        throw new NotFoundException('User with this email already exists');
      }

      const newUser = await this.authModel.create({
        username: userData.username,
        name: userData.name,
        password: userData.password,
      });

      return newUser;
    } catch (error) {
      console.log(error.message);
    }
  }

  async login(userData: any) {
    try {
      const existingUser = await this.authModel.findOne({
        username: userData.username,
      });
      if (!existingUser) {
        throw new NotFoundException('User Not found');
      }

      return existingUser;
    } catch (error) {
      console.log(error.message);
    }
  }
}
