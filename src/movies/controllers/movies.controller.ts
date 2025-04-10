import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { MoviesService } from '../services/movies.service';

@ApiTags('Films')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOperation({ summary: 'Liste tous les films' })
  @ApiResponse({
    status: 200,
    description: 'Liste des films récupérée avec succès',
  })
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un film par son ID' })
  @ApiResponse({ status: 200, description: 'Film récupéré avec succès' })
  @ApiResponse({ status: 404, description: 'Film non trouvé' })
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Crée un nouveau film' })
  @ApiResponse({ status: 201, description: 'Film créé avec succès' })
  @ApiResponse({ status: 403, description: 'Accès non autorisé' })
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Met à jour un film' })
  @ApiResponse({ status: 200, description: 'Film mis à jour avec succès' })
  @ApiResponse({ status: 404, description: 'Film non trouvé' })
  @ApiResponse({ status: 403, description: 'Accès non autorisé' })
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Supprime un film' })
  @ApiResponse({ status: 200, description: 'Film supprimé avec succès' })
  @ApiResponse({ status: 404, description: 'Film non trouvé' })
  @ApiResponse({ status: 403, description: 'Accès non autorisé' })
  remove(@Param('id') id: string) {
    return this.moviesService.delete(id);
  }
}
