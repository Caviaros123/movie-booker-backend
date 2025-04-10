import { Injectable } from '@nestjs/common';

export interface Booking {
  id: string;
  movieId: string;
  userId: string;
  date: string;
}

@Injectable()
export class BookingService {
  private bookings: Booking[] = [];

  getBookings() {
    return this.bookings;
  }

  getBooking(id: string) {
    return this.getBookings().find((booking) => booking.id === id);
  }

  createBooking(booking: Booking) {
    return this.getBookings().push(booking);
  }

  updateBooking(id: string, book: Booking) {
    const index = this.getBookings().findIndex((booking) => booking.id === id);
    if (index !== -1) {
      this.getBookings()[index] = book;
    }
    return this.getBookings()[index];
  }

  deleteBooking(id: string) {
    const index = this.getBookings().findIndex((booking) => booking.id === id);
    if (index !== -1) {
      this.getBookings().splice(index, 1);
    }
    return this.getBookings();
  }
}
