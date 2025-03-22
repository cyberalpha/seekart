import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { EventType } from '@/types';

// For web, we'll use a simple HTML input range
const WebSlider = ({ value, onValueChange, minimumValue, maximumValue }: any) => (
  <input
    type="range"
    min={minimumValue}
    max={maximumValue}
    value={value}
    onChange={(e) => onValueChange(Number(e.target.value))}
    style={{ width: '100%', height: 40 }}
  />
);

// Conditionally import the native slider
let NativeSlider: any;
if (Platform.OS !== 'web') {
  NativeSlider = require('@react-native-community/slider').default;
}

const EVENT_TYPES = [
  { id: 'musica', label: 'Música', color: '#22c55e' },
  { id: 'teatro', label: 'Teatro', color: '#eab308' },
  { id: 'imagenes', label: 'Imágenes', color: '#ef4444' },
  { id: 'letras', label: 'Letras', color: '#3b82f6' },
  { id: 'cine', label: 'Cine', color: '#f97316' },
];

interface EventFiltersProps {
  selectedTypes: EventType[];
  onSelectTypes: (types: EventType[]) => void;
  searchRadius: number;
  onSearchRadiusChange: (radius: number) => void;
}

export function EventFilters({
  selectedTypes,
  onSelectTypes,
  searchRadius,
  onSearchRadiusChange,
}: EventFiltersProps) {
  const toggleType = (type: EventType) => {
    if (selectedTypes.includes(type)) {
      onSelectTypes(selectedTypes.filter(t => t !== type));
    } else {
      onSelectTypes([...selectedTypes, type]);
    }
  };

  const SliderComponent = Platform.OS === 'web' ? WebSlider : NativeSlider;

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        {EVENT_TYPES.map(type => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.filterButton,
              { backgroundColor: type.color },
              !selectedTypes.includes(type.id as EventType) && styles.filterButtonInactive,
            ]}
            onPress={() => toggleType(type.id as EventType)}>
            <Text style={styles.filterText}>{type.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.radiusContainer}>
        <Text style={styles.radiusLabel}>
          Radio de búsqueda: {(searchRadius / 1000).toFixed(1)} km
        </Text>
        <SliderComponent
          style={styles.slider}
          minimumValue={1000}
          maximumValue={100000}
          value={searchRadius}
          onValueChange={onSearchRadiusChange}
          minimumTrackTintColor="#2563eb"
          maximumTrackTintColor="#e5e7eb"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  filterButtonInactive: {
    opacity: 0.5,
  },
  filterText: {
    color: 'white',
    fontWeight: '600',
  },
  radiusContainer: {
    marginTop: 8,
  },
  radiusLabel: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});