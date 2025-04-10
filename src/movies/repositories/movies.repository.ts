import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../core/services/supabase.service';
import { Database } from '../../types/supabase';

@Injectable()
export class MoviesRepository {
  constructor(private readonly supabaseService: SupabaseService) {}

  private get supabase() {
    return this.supabaseService.getClient();
  }

  async findAll() {
    const { data, error } = await this.supabase
      .from('movies')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase
      .from('movies')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async create(movie: Database['public']['Tables']['movies']['Insert']) {
    const { data, error } = await this.supabase
      .from('movies')
      .insert(movie)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(
    id: string,
    movie: Database['public']['Tables']['movies']['Update'],
  ): Promise<Response> {
    const { data, error } = await this.supabase
      .from('movies')
      .update(movie)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async delete(id: string) {
    const { error } = await this.supabase.from('movies').delete().eq('id', id);

    if (error) throw error;
  }
}
