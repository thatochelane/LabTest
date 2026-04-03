import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function StoryItem({ story }) {
  if (story.isMusic) {
    return (
      <TouchableOpacity style={styles.musicCard}>
        <View style={styles.musicIconCircle}>
          <Ionicons name="musical-notes" size={28} color="#1877F2" />
        </View>
        <Text style={styles.musicLabel}>Music</Text>
      </TouchableOpacity>
    );
  }

  if (story.isCreate) {
    return (
      <TouchableOpacity style={styles.createCard}>
        <View style={styles.createTop} />
        <View style={styles.createBottom}>
          <View style={styles.plusCircle}>
            <Ionicons name="add" size={22} color="#fff" />
          </View>
          <Text style={styles.createLabel}>Create story</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.storyCard}>
      <Image
        source={
          typeof story.image === 'string'
          ? { uri: story.image } 
          : story.image          
      }
        style={styles.storyImage}
    />
      {story.badge && (
        <View style={styles.storyBadge}>
          <Text style={styles.storyBadgeText}>{story.badge}</Text>
        </View>
      )}
      <Text style={styles.storyName}>{story.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  musicCard: {
    width: 110,
    height: 180,
    borderRadius: 12,
    backgroundColor: '#1877F2',
    marginRight: 8,
    justifyContent: 'flex-end',
    padding: 10,
    overflow: 'hidden',
  },
  musicIconCircle: {
    backgroundColor: '#fff',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    alignSelf: 'center',
    marginTop: 30,
  },
  musicLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 'auto',
  },
  createCard: {
    width: 110,
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 8,
    backgroundColor: '#3a3a3a',
  },
  createTop: {
    flex: 1,
    backgroundColor: '#555',
  },
  createBottom: {
    height: 70,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  plusCircle: {
    backgroundColor: '#1877F2',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -18,
  },
  createLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  storyCard: {
    width: 110,
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 8,
  },
  storyImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  storyBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#1877F2',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  storyName: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});