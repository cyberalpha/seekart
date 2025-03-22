import { Tabs } from 'expo-router';
import { MapPin, User, Users } from 'lucide-react-native';
import { View, Text, StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#64748b',
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explorar',
          headerTitle: 'Seekart',
          headerRight: () => (
            <View style={styles.headerRight}>
              <Text style={styles.slogan}>En busca del arte</Text>
            </View>
          ),
          tabBarIcon: ({ size, color }) => (
            <MapPin size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Mi Perfil',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="artists"
        options={{
          title: 'Artistas',
          tabBarIcon: ({ size, color }) => (
            <Users size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
  },
  header: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    color: '#2563eb',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerRight: {
    marginRight: 16,
  },
  slogan: {
    color: '#64748b',
    fontSize: 14,
    fontStyle: 'italic',
  },
});