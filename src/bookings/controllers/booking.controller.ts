import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
import { Booking, BookingService } from './booking.service';
import { CreateBookingDto } from '../dto/create-booking.dto';

@ApiTags('Réservations')
@ApiBearerAuth()
@Controller('booking')
export class BookingsController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Créer une nouvelle réservation',
    description: `
    Cette route permet de créer une nouvelle réservation pour une séance de film.
    Vous devez être connecté pour effectuer une réservation.
    
    Étapes pour réserver :
    1. Trouvez l'ID de la séance qui vous intéresse
    2. Vérifiez les sièges disponibles
    3. Choisissez un numéro de siège
    4. Envoyez votre demande de réservation
    
    Le système vérifiera automatiquement :
    - Si le siège est disponible
    - Si vous avez déjà une réservation pour cette séance
    - Si la séance n'est pas déjà commencée
    `,
  })
  @ApiResponse({
    status: 201,
    description: 'Réservation créée avec succès',
  })
  @ApiResponse({
    status: 400,
    description: 'Données invalides ou siège déjà réservé',
  })
  @ApiResponse({
    status: 401,
    description: 'Non authentifié',
  })
  @ApiResponse({
    status: 403,
    description: 'Accès non autorisé',
  })
  create(@Body() createBookingDto: CreateBookingDto, @Request() req) {
    return this.bookingService.createBooking(
      createBookingDto,
      req.user.id as string,
    );
  }

  @Get('my-bookings')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Voir mes réservations',
    description: `
    Cette route permet de voir toutes vos réservations.
    Vous devez être connecté pour accéder à vos réservations.
    
    Les informations retournées incluent :
    - Le film et la séance
    - Le numéro de votre siège
    - Le statut de la réservation
    - La date et l'heure de la séance
    `,
  })
  @ApiResponse({
    status: 200,
    description: 'Liste de vos réservations',
  })
  @ApiResponse({
    status: 401,
    description: 'Non authentifié',
  })
  getMyBookings(@Request() req) {
    return this.bookingService.getBookings(req.user.id as string);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: "Voir les détails d'une réservation",
    description: `
    Cette route permet de voir les détails d'une réservation spécifique.
    Vous ne pouvez voir que vos propres réservations.
    `,
  })
  @ApiResponse({
    status: 200,
    description: 'Détails de la réservation',
  })
  getBooking(@Param('id') id: string, @Request() req) {
    return this.bookingService.getBooking(id, req.user.id as string);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Annuler une réservation',
    description: "Permet d'annuler une réservation existante",
  })
  cancelBooking(@Param('id') id: string, @Request() req) {
    return this.bookingService.deleteBooking(id, req.user.id as string);
  }
}
