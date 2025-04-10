import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TmdbService } from '../services/tmdb.service';

@ApiTags('Films')
@Controller('movies')
export class MoviesController {
  constructor(private readonly tmdbService: TmdbService) {}

  @Get('now_playing')
  @ApiOperation({ summary: 'Récupérer les films actuellement en salle' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Numéro de page',
  })
  @ApiResponse({ status: 200, description: 'Liste des films en salle' })
  async getNowPlaying(@Query('page') page: number = 1) {
    return this.tmdbService.getNowPlaying(page);
  }

  @Get('search')
  @ApiOperation({ summary: 'Rechercher un film par titre' })
  @ApiQuery({
    name: 'query',
    required: true,
    type: String,
    description: 'Titre du film à rechercher',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Numéro de page',
  })
  @ApiResponse({ status: 200, description: 'Résultats de la recherche' })
  async searchMovies(
    @Query('query') query: string,
    @Query('page') page: number = 1,
  ) {
    return this.tmdbService.searchMovies(query, page);
  }

  @Get(':id')
  @ApiOperation({ summary: "Obtenir les détails d'un film spécifique" })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'ID du film',
  })
  @ApiResponse({ status: 200, description: 'Détails du film' })
  async getMovieDetails(@Param('id') id: string) {
    return this.tmdbService.getMovieDetails(id);
  }

  @Get('genres/list')
  @ApiOperation({ summary: 'Obtenir la liste des genres de films' })
  @ApiResponse({ status: 200, description: 'Liste des genres' })
  async getGenres() {
    return this.tmdbService.getGenres();
  }
}
