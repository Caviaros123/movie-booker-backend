import { Injectable } from '@nestjs/common';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Database } from '../../types/supabase';

@Injectable()
export class SupabaseService {
  private client: SupabaseClient<Database>;

  constructor() {
    this.client = createClient<Database>(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_ANON_KEY as string,
    );
  }

  getClient(): SupabaseClient<Database> {
    return this.client;
  }
}
