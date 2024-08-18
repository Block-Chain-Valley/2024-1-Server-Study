import { IsEthereumAddress, MaxLength } from 'class-validator';

export class DeleteAssetInput {
  @IsEthereumAddress()
  @MaxLength(256)
  userWalletAddress!: string;

  @IsEthereumAddress()
  @MaxLength(256)
  address!: string;
}
