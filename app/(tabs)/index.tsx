import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import * as Location from 'expo-location';
import { EventType } from '@/types';
import { EventFilters } from '@/components/EventFilters';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/supabase';

type Event = Database['public']['Tables']['events']['Row'];

// Web placeholder component for the map
const WebMapPlaceholder = ({ style, children }: any) => (
  <View style={[style, styles.webMapPlaceholder]}>
    <Text style={styles.webMapText}>
      El mapa no está disponible en la versión web por el momento.
      Por favor, utiliza la aplicación móvil para acceder a todas las funcionalidades.
    </Text>
    {children}
  </View>
);

// Conditional import for react-native-maps
let MapView: any, Marker: any, Circle: any;
if (Platform.OS !== 'web') {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
  Circle = Maps.Circle;
} else {
  MapView = WebMapPlaceholder;
  Marker = () => null;
  Circle = () => null;
}

export default function ExploreScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [searchRadius, setSearchRadius] = useState(5000);
  const [selectedTypes, setSelectedTypes] = useState<EventType[]>(['musica', 'teatro', 'imagenes', 'letras', 'cine']);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Se requiere acceso a la ubicación para mostrar eventos cercanos.');
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);

        // Fetch events from Supabase
        const { data, error: eventsError } = await supabase
          .from('events')
          .select('*')
          .order('date', { ascending: true });

        if (eventsError) {
          throw eventsError;
        }

        setEvents(data);
      } catch (err) {
        setError('Error al cargar los eventos. Por favor, intenta nuevamente.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Esperando ubicación...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {Platform.OS !== 'web' && (
          <>
            <Circle
              center={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              radius={searchRadius}
              fillColor="rgba(37, 99, 235, 0.1)"
              strokeColor="rgba(37, 99, 235, 0.5)"
            />
            {events
              .filter(event => selectedTypes.includes(event.type))
              .map(event => (
                <Marker
                  key={event.id}
                  coordinate={{
                    latitude: event.latitude,
                    longitude: event.longitude,
                  }}
                  title={event.title}
                  description={event.description}
                />
              ))}
          </>
        )}
      </MapView>
      <EventFilters
        selectedTypes={selectedTypes}
        onSelectTypes={setSelectedTypes}
        searchRadius={searchRadius}
        onSearchRadiusChange={setSearchRadius}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  webMapPlaceholder: {
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  webMapText: {
    textAlign: 'center',
    color: '#4b5563',
    fontSize: 16,
    maxWidth: 400,
  },
  loadingText: {
    textAlign: 'center',
    color: '#4b5563',
    fontSize: 16,
    marginTop: 20,
  },
  errorText: {
    textAlign: 'center',
    color: '#ef4444',
    fontSize: 16,
    marginTop: 20,
    paddingHorizontal: 20,
  },
});