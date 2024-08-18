import { Injectable, NotFoundException } from '@nestjs/common';
import { UserInput } from './user.input';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(userInput: UserInput) {
    const userInfo = await this.prisma.user.create({
      data: {
        ...userInput,
      },
    });
    return userInfo;
  }

  async findUserByAddress(userInput: UserInput) {
    const { address } = userInput;
    if (!address) {
      throw new NotFoundException();
    }
    const userInfo = await this.prisma.extended.user.findUnique({
      where: {
        address,
      },
    });
    return userInfo;
  }

  async findAllUsers() {
    const userInfos = await this.prisma.extended.user.findMany();
    return userInfos;
  }
}
