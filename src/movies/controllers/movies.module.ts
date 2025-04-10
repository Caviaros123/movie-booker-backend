import { Module } from '@nestjs/common';
import { TmdbService } from '../services/tmdb.service';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
@Module({
  controllers: [MoviesController],
  providers: [MoviesService, TmdbService],
  exports: [MoviesService, TmdbService],
})
export class MoviesModule {}
