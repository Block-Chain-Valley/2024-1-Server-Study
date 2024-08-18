import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateAssetInput } from './create-asset.input';
import { Prisma } from 'libs/prisma/generated/client';

@Injectable()
export class AssetService {
  constructor(private readonly prisma: PrismaService) {}

  async createAsset(createAssetInput: CreateAssetInput) {
    const { userWalletAddress, balance, ...userInput } = createAssetInput;
    const userInfo = await this.prisma.extended.user.findUnique({
      where: {
        address: userWalletAddress,
      },
    });
    if (!userInfo) {
      throw new NotFoundException();
    }

    return this.prisma.$transaction(
      async (prismaTransaction: Prisma.TransactionClient) => {
        const assetInfo = await prismaTransaction.asset.create({
          data: {
            ...userInput,
          },
        });

        await prismaTransaction.userAssetBalance.create({
          data: {
            assetId: assetInfo.id,
            userId: userInfo.id,
            balance,
          },
        });

        return assetInfo;
      },
    );
  }
}
