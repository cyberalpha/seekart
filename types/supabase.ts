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
      users: {
        Row: {
          id: string
          name: string
          type: 'fan' | 'artist'
          profile_image: string | null
          created_at: string
        }
        Insert: {
          id: string
          name: string
          type: 'fan' | 'artist'
          profile_image?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: 'fan' | 'artist'
          profile_image?: string | null
          created_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string
          image_url: string
          video_url: string | null
          type: 'musica' | 'teatro' | 'imagenes' | 'letras' | 'cine'
          latitude: number
          longitude: number
          address: string
          cross_streets: string
          locality: string
          city: string
          ticket_url: string | null
          date: string
          artist_id: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          image_url: string
          video_url?: string | null
          type: 'musica' | 'teatro' | 'imagenes' | 'letras' | 'cine'
          latitude: number
          longitude: number
          address: string
          cross_streets: string
          locality: string
          city: string
          ticket_url?: string | null
          date: string
          artist_id: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image_url?: string
          video_url?: string | null
          type?: 'musica' | 'teatro' | 'imagenes' | 'letras' | 'cine'
          latitude?: number
          longitude?: number
          address?: string
          cross_streets?: string
          locality?: string
          city?: string
          ticket_url?: string | null
          date?: string
          artist_id?: string
          created_at?: string
        }
      }
    }
  }
}