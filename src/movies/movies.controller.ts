import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getMovies() {
    return this.moviesService.getMovies();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getMovie(@Param('id') id: string) {
    return this.moviesService.getMovie(id);
  }
}
