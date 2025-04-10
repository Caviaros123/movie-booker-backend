import { Injectable } from '@nestjs/common';
import { BookingsRepository } from '../repositories/bookings.repository';
import { CreateBookingDto } from '../dto/create-booking.dto';
export interface Booking {
  id: string;
  movieId: string;
  userId: string;
  date: string;
}

@Injectable()
export class BookingService {
  constructor(private readonly bookingsRepository: BookingsRepository) {}

  getBookings(userId: string) {
    return this.bookingsRepository.findByUserId(userId);
  }

  getBooking(id: string, userId: string) {
    return this.bookingsRepository.findOne(id, userId);
  }

  createBooking(booking: CreateBookingDto, userId: string) {
    return this.bookingsRepository.create({
      user_id: userId,
      screening_id: booking.screening_id,
      seat_number: 1,
      status: 'pending',
    });
  }

  updateBooking(id: string, book: Booking, userId: string) {
    return this.bookingsRepository.update(id, {
      user_id: userId,
      screening_id: book.id,
      seat_number: Math.floor(Math.random() * 100),
      status: 'pending',
    });
  }

  deleteBooking(id: string, userId: string) {
    return this.bookingsRepository.delete(id, userId);
  }
}
