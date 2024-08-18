import { IsEthereumAddress, MaxLength } from 'class-validator';

export class UserInput {
  @IsEthereumAddress()
  @MaxLength(256)
  address!: string;
}
