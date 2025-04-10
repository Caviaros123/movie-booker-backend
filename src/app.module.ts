import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookingController } from './booking/booking.controller';
import { BookingModule } from './booking/booking.module';
import { BookingService } from './booking/booking.service';
import { CoreModule } from './core/core.module';
import { MoviesController } from './movies/movies.controller';
import { MoviesModule } from './movies/movies.module';
import { MoviesService } from './movies/movies.service';

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
  controllers: [AppController, MoviesController, BookingController],
  providers: [AppService, MoviesService, BookingService],
})
export class AppModule {}
