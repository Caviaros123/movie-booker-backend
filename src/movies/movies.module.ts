import { Module } from '@nestjs/common';
import { MoviesController } from './controllers/movies.controller';
import { MoviesRepository } from './repositories/movies.repository';
import { MoviesService } from './services/movies.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, MoviesRepository],
  exports: [MoviesService],
})
export class MoviesModule {}
