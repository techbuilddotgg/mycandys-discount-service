import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateOfferDto {
  @ApiProperty({ required: true })
  @IsString()
  id: string;
}
