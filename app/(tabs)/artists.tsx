import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { MapPin, Music, Theater, Camera, BookOpen, Film } from 'lucide-react-native';

const artists = [
  {
    id: '1',
    name: 'Carlos Rodríguez',
    type: 'Música',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=200&h=200&fit=crop',
    location: 'Buenos Aires',
    icon: Music,
    color: '#22c55e',
  },
  {
    id: '2',
    name: 'Laura Martínez',
    type: 'Teatro',
    image: 'https://images.unsplash.com/photo-1526218626217-dc65a29bb444?q=80&w=200&h=200&fit=crop',
    location: 'Córdoba',
    icon: Theater,
    color: '#eab308',
  },
  {
    id: '3',
    name: 'Miguel Ángel',
    type: 'Imágenes',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop',
    location: 'Rosario',
    icon: Camera,
    color: '#ef4444',
  },
  {
    id: '4',
    name: 'Ana Escritora',
    type: 'Letras',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&fit=crop',
    location: 'Mendoza',
    icon: BookOpen,
    color: '#3b82f6',
  },
  {
    id: '5',
    name: 'Pedro Director',
    type: 'Cine',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&fit=crop',
    location: 'La Plata',
    icon: Film,
    color: '#f97316',
  },
];

export default function ArtistsScreen() {
  const renderArtist = ({ item }: { item: typeof artists[0] }) => {
    const Icon = item.icon;
    return (
      <TouchableOpacity style={styles.artistCard}>
        <Image source={{ uri: item.image }} style={styles.artistImage} />
        <View style={styles.artistInfo}>
          <Text style={styles.artistName}>{item.name}</Text>
          <View style={styles.artistType}>
            <Icon size={16} color={item.color} />
            <Text style={[styles.artistTypeText, { color: item.color }]}>{item.type}</Text>
          </View>
          <View style={styles.location}>
            <MapPin size={16} color="#64748b" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={artists}
        renderItem={renderArtist}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  list: {
    padding: 16,
  },
  artistCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  artistImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  artistInfo: {
    marginLeft: 16,
    flex: 1,
  },
  artistName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  artistType: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  artistTypeText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#64748b',
  },
});