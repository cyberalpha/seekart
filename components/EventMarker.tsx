import { View } from 'react-native';
import { Marker } from 'react-native-maps';
import { ArtEvent } from '@/types';

const EVENT_COLORS = {
  musica: '#22c55e',
  teatro: '#eab308',
  imagenes: '#ef4444',
  letras: '#3b82f6',
  cine: '#f97316',
};

interface EventMarkerProps {
  event: ArtEvent;
}

export function EventMarker({ event }: EventMarkerProps) {
  return (
    <Marker
      coordinate={{
        latitude: event.location.latitude,
        longitude: event.location.longitude,
      }}
      pinColor={EVENT_COLORS[event.type]}
      title={event.title}
      description={event.description}
    />
  );
}