import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDiscountDto {
  @ApiProperty({ required: true })
  @IsString()
  type: string;

  @ApiProperty({ required: true })
  @IsString()
  value: number;

  @ApiProperty({ required: true })
  @IsString()
  status: boolean;
}
