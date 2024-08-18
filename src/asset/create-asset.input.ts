import { IsEthereumAddress, IsInt, IsString, MaxLength } from 'class-validator';

export class CreateAssetInput {
  @IsEthereumAddress()
  userWalletAddress!: string;

  @IsEthereumAddress()
  @MaxLength(256)
  address!: string;

  @IsString()
  name: string;

  @IsString()
  symbol: string;

  @IsInt()
  decimal!: number;

  @IsString()
  balance: string;
}
