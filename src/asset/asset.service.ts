import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateAssetInput } from './create-asset.input';
import { Prisma } from 'libs/prisma/generated/client';
import { DeleteAssetInput } from './delete-asset.input';

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

  async deleteAsset(deleteAssetInput: DeleteAssetInput) {
    /// userAssetBalance만 지워주기
    /// 실제로는 지우는게 아니라 status를 INACTIVE로 바꿔주기
    console.log(deleteAssetInput);
  }
}
