import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateDiscountDto {
  @ApiProperty({ required: true })
  @IsString()
  type: string;

  @ApiProperty({ required: true })
  @IsNumber()
  value: number;

  @ApiProperty({ required: true })
  @IsBoolean()
  status: boolean;
}
