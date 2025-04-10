import { DynamicModule, Module } from '@nestjs/common';
import { BookingsRepository } from '../repositories/bookings.repository';
import { BookingsController } from './booking.controller';
import { BookingService } from './booking.service';

@Module({
  controllers: [BookingsController],
  providers: [BookingService, BookingsRepository],
  exports: [BookingService],
})
export class BookingModule {
  static forRoot(): DynamicModule {
    return {
      module: BookingModule,
      providers: [BookingService, BookingsRepository],
    };
  }
}
