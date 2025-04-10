import { DynamicModule, Global, Module } from '@nestjs/common';
import { SupabaseService } from './services/supabase.service';

@Global()
@Module({
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class CoreModule {
  static forRoot(): DynamicModule {
    return {
      module: CoreModule,
      providers: [SupabaseService],
      exports: [SupabaseService],
    };
  }
}
