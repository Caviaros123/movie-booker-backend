export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          role: 'user' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name?: string | null
          last_name?: string | null
          role?: 'user' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          role?: 'user' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      movies: {
        Row: {
          id: string
          title: string
          description: string | null
          duration: number
          release_date: string
          rating: number | null
          poster_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          duration: number
          release_date: string
          rating?: number | null
          poster_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          duration?: number
          release_date?: string
          rating?: number | null
          poster_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      cinemas: {
        Row: {
          id: string
          name: string
          address: string
          city: string
          postal_code: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          address: string
          city: string
          postal_code: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string
          city?: string
          postal_code?: string
          created_at?: string
          updated_at?: string
        }
      }
      screens: {
        Row: {
          id: string
          cinema_id: string
          name: string
          capacity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          cinema_id: string
          name: string
          capacity: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          cinema_id?: string
          name?: string
          capacity?: number
          created_at?: string
          updated_at?: string
        }
      }
      screenings: {
        Row: {
          id: string
          movie_id: string
          screen_id: string
          start_time: string
          end_time: string
          price: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          movie_id: string
          screen_id: string
          start_time: string
          end_time: string
          price: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          movie_id?: string
          screen_id?: string
          start_time?: string
          end_time?: string
          price?: number
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string
          screening_id: string
          seat_number: number
          status: 'pending' | 'confirmed' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          screening_id: string
          seat_number: number
          status: 'pending' | 'confirmed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          screening_id?: string
          seat_number?: number
          status?: 'pending' | 'confirmed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 