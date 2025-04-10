import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookingsController } from './bookings/controllers/booking.controller';
import { BookingModule } from './bookings/controllers/booking.module';
import { BookingService } from './bookings/controllers/booking.service';
import { BookingsRepository } from './bookings/repositories/bookings.repository';
import { CoreModule } from './core/core.module';
import { MoviesController } from './movies/controllers/movies.controller';
import { MoviesModule } from './movies/controllers/movies.module';
import { MoviesService } from './movies/controllers/movies.service';
import { TmdbService } from './movies/services/tmdb.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CoreModule,
    AuthModule,
    BookingModule,
    MoviesModule,
  ],
  controllers: [AppController, MoviesController, BookingsController],
  providers: [
    AppService,
    MoviesService,
    BookingService,
    BookingsRepository,
    TmdbService,
  ],
})
export class AppModule {}
