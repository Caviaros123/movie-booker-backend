import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({
    description: 'ID de la séance',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  screening_id: string;

  @ApiProperty({
    description: 'Numéro du siège',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  seat_number: number;
}
