import { Injectable, NotFoundException } from '@nestjs/common';
import { Database } from '../../types/supabase';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { MoviesRepository } from '../repositories/movies.repository';

@Injectable()
export class MoviesService {
  constructor(private readonly moviesRepository: MoviesRepository) {}

  async findAll() {
    return this.moviesRepository.findAll();
  }

  async findOne(id: string) {
    const movie = await this.moviesRepository.findOne(id);
    if (!movie) {
      throw new NotFoundException(`Film avec l'ID ${id} non trouvé`);
    }
    return movie;
  }

  async create(createMovieDto: CreateMovieDto) {
    return this.moviesRepository.create({
      ...createMovieDto,
      release_date: createMovieDto.release_date.toISOString(),
    });
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    await this.findOne(id);
    const updateData: Database['public']['Tables']['movies']['Update'] = {
      ...updateMovieDto,
      release_date: updateMovieDto.release_date?.toISOString(),
    };
    return this.moviesRepository.update(id, updateData);
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.moviesRepository.delete(id);
  }
}
