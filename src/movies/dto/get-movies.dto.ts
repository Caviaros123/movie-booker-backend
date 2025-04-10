import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

export class GetMoviesDto {
  @ApiProperty({
    description: 'Titre du film',
    example: 'Inception',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Description du film',
    example: 'Un voleur qui vole des secrets...',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Durée du film en minutes',
    example: 148,
  })
  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @ApiProperty({
    description: 'Date de sortie du film',
    example: '2024-01-01',
  })
  @IsDateString()
  @IsNotEmpty()
  releaseDate: Date;

  @ApiProperty({
    description: "URL de l'affiche du film",
    example: 'https://example.com/poster.jpg',
  })
  @IsString()
  @IsNotEmpty()
  posterUrl: string;
}
