import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateAssetInput } from './create-asset.input';

@Injectable()
export class AssetService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAssetInput) {
    console.log(data);
  }
}
