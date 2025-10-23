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
          full_name: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          created_at?: string
          updated_at?: string
        }
      }
      locations: {
        Row: {
          id: string
          name: string
          address: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          address: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string
          created_at?: string
        }
      }
      match_days: {
        Row: {
          id: string
          date: string
          time: string
          location_id: string
          cancelled: boolean
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          date: string
          time: string
          location_id: string
          cancelled?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          date?: string
          time?: string
          location_id?: string
          cancelled?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      registrations: {
        Row: {
          id: string
          match_day_id: string
          user_id: string
          brings_bibs: boolean
          brings_key: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          match_day_id: string
          user_id: string
          brings_bibs?: boolean
          brings_key?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          match_day_id?: string
          user_id?: string
          brings_bibs?: boolean
          brings_key?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// Helper types
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Location = Database['public']['Tables']['locations']['Row']
export type MatchDay = Database['public']['Tables']['match_days']['Row']
export type Registration = Database['public']['Tables']['registrations']['Row']

// Extended types with relations
export type MatchDayWithDetails = MatchDay & {
  location: Location
  registrations: (Registration & { profile: Profile })[]
  _count?: {
    registrations: number
  }
}

export type RegistrationWithProfile = Registration & {
  profile: Profile
}
