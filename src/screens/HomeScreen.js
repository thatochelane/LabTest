import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import PostCard from '../components/PostCard';
import StoryItem from '../components/StoryItem';
import { initialPosts, stories, currentUser } from '../data/data';

let globalPosts = [...initialPosts];

export const addGlobalPost = (post) => {
  globalPosts = [post, ...globalPosts];
};

export const getGlobalPosts = () => globalPosts;

export default function HomeScreen() {
  const [posts, setPosts] = useState(globalPosts);

  useFocusEffect(
    useCallback(() => {
      setPosts([...globalPosts]);
    }, [])
  );

  const handleDelete = (id) => {
    globalPosts = globalPosts.filter((p) => p.id !== id);
    setPosts([...globalPosts]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>facebook</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconCircle}>
            <Ionicons name="add" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconCircle}>
            <Ionicons name="search" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconCircle}>
            <Ionicons name="menu" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Create Post */}
            <View style={styles.createPost}>
              <Image
                source={
                  typeof currentUser.avatar === 'string'
                  ? { uri: currentUser.avatar } 
                  : currentUser.avatar          
            }
          style={styles.avatar}
        />
              <TouchableOpacity style={styles.createPostInput}>
                <Text style={styles.createPostText}>What's on your mind?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.photoButton}>
                <MaterialIcons name="photo" size={28} color="#4CAF50" />
                <Text style={styles.photoText}>Photo</Text>
              </TouchableOpacity>
            </View>

            {/* Stories */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.storiesContainer}
            >
              {stories.map((story) => (
                <StoryItem key={story.id} story={story} />
              ))}
            </ScrollView>

            <View style={styles.divider} />
          </>
        }
        renderItem={({ item }) => (
          <PostCard post={item} onDelete={handleDelete} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#1a1a1a',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1877F2',
    fontStyle: 'italic',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconCircle: {
    backgroundColor: '#3a3a3a',
    borderRadius: 20,
    padding: 8,
  },
  createPost: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#242424',
    padding: 12,
    gap: 10,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  createPostInput: {
    flex: 1,
    backgroundColor: '#3a3a3a',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  createPostText: {
    color: '#aaa',
    fontSize: 15,
  },
  photoButton: {
    alignItems: 'center',
  },
  photoText: {
    color: '#aaa',
    fontSize: 11,
    marginTop: 2,
  },
  storiesContainer: {
    backgroundColor: '#242424',
    paddingVertical: 10,
    paddingLeft: 10,
  },
  divider: {
    height: 8,
    backgroundColor: '#111',
  },
});