import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({ description: 'Titre du film' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Description du film', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Durée du film en minutes' })
  @IsNumber()
  @Min(1)
  duration: number;

  @ApiProperty({ description: 'Date de sortie du film' })
  @IsDate()
  release_date: Date;

  @ApiProperty({ description: 'Note du film (0-10)', required: false })
  @IsNumber()
  @IsOptional()
  rating?: number;

  @ApiProperty({ description: "URL de l'affiche du film", required: false })
  @IsString()
  @IsOptional()
  poster_url?: string;
}
