import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Settings, Heart, Calendar, MapPin } from 'lucide-react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Ana García</Text>
        <Text style={styles.userType}>Fan del Arte</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>23</Text>
          <Text style={styles.statLabel}>Eventos</Text>
          <Text style={styles.statLabel}>Asistidos</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>15</Text>
          <Text style={styles.statLabel}>Artistas</Text>
          <Text style={styles.statLabel}>Seguidos</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>45</Text>
          <Text style={styles.statLabel}>Eventos</Text>
          <Text style={styles.statLabel}>Guardados</Text>
        </View>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Heart size={24} color="#2563eb" />
          <Text style={styles.menuText}>Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Calendar size={24} color="#2563eb" />
          <Text style={styles.menuText}>Mis Eventos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <MapPin size={24} color="#2563eb" />
          <Text style={styles.menuText}>Ubicaciones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Settings size={24} color="#2563eb" />
          <Text style={styles.menuText}>Configuración</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  userType: {
    fontSize: 16,
    color: '#64748b',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  menu: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  menuText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#1e293b',
  },
});