export type EventType = 'musica' | 'teatro' | 'imagenes' | 'letras' | 'cine';

export interface ArtEvent {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  type: EventType;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    crossStreets: string;
    locality: string;
    city: string;
  };
  ticketUrl?: string;
  date: string;
  artistId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  type: 'fan' | 'artist';
  profileImage?: string;
}