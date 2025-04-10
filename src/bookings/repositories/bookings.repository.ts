import { Injectable, Module } from '@nestjs/common';
import { SupabaseService } from '../../core/services/supabase.service';
import { Database } from '../../types/supabase';

@Injectable()
@Module({
  providers: [BookingsRepository],
  exports: [BookingsRepository],
})
export class BookingsRepository {
  constructor(private readonly supabase: SupabaseService) {}

  async create(booking: Database['public']['Tables']['bookings']['Insert']) {
    const { data, error } = await this.supabase
      .getClient()
      .from('bookings')
      .insert(booking)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async findByUserId(userId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('bookings')
      .select(
        `
        *,
        screening:screening_id (
          *,
          movie:movie_id (*),
          screen:screen_id (
            *,
            cinema:cinema_id (*)
          )
        )
      `,
      )
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async findOne(id: string, userId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('bookings')
      .select(
        `
        *,
        screening:screening_id (
          *,
          movie:movie_id (*),
          screen:screen_id (
            *,
            cinema:cinema_id (*)
          )
        )
      `,
      )
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  }

  async findByScreeningAndSeat(screeningId: string, seatNumber: number) {
    const { data, error } = await this.supabase
      .getClient()
      .from('bookings')
      .select()
      .eq('screening_id', screeningId)
      .eq('seat_number', seatNumber)
      .eq('status', 'confirmed')
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async findByUserAndScreening(userId: string, screeningId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('bookings')
      .select()
      .eq('user_id', userId)
      .eq('screening_id', screeningId)
      .eq('status', 'confirmed')
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async update(
    id: string,
    booking: Database['public']['Tables']['bookings']['Update'],
  ) {
    const { error } = await this.supabase
      .getClient()
      .from('bookings')
      .update(booking)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
  }

  async delete(id: string, userId: string) {
    const { error } = await this.supabase
      .getClient()
      .from('bookings')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;
    return { message: 'Booking deleted successfully' };
  }
}
