import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { MediaTypeOptions } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import { currentUser } from '../data/data';
import { addGlobalPost } from './HomeScreen';

export default function AddPostScreen({ navigation }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [audience, setAudience] = useState('Friends');

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission needed', 'Please allow access to your gallery.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePost = () => {
    if (!content.trim() && !image) {
      Alert.alert('Empty Post', 'Please write something or add a photo.');
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      username: currentUser.name,
      time: 'Just now',
      avatar: currentUser.avatar,
      content: content.trim(),
      image: image,
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
    };

    addGlobalPost(newPost);
    setContent('');
    setImage(null);
    Alert.alert('Posted!', 'Your post has been shared.', [
      { text: 'OK', onPress: () => navigation.navigate('Home') },
    ]);
  };

  const toggleAudience = () => {
    setAudience(audience === 'Friends' ? 'Public' : 'Friends');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Post</Text>
        <TouchableOpacity
          style={[styles.postButton, (!content.trim() && !image) && styles.postButtonDisabled]}
          onPress={handlePost}
        >
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* User Info */}
      <View style={styles.userRow}>
        <Image
  source={
    typeof currentUser.avatar === 'string'
      ? { uri: currentUser.avatar }
      : currentUser.avatar
  }
  style={styles.avatar}
/>
        <View>
          <Text style={styles.username}>{currentUser.name}</Text>
          <TouchableOpacity style={styles.audienceBtn} onPress={toggleAudience}>
            <Ionicons name={audience === 'Friends' ? 'people' : 'globe'} size={12} color="#fff" />
            <Text style={styles.audienceText}>{audience}</Text>
            <Ionicons name="chevron-down" size={12} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Text Input */}
      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        placeholderTextColor="#aaa"
        multiline
        textAlignVertical="top"
        value={content}
        onChangeText={setContent}
      />

      {/* Image Preview */}
      {image && (
        <View style={styles.imagePreviewWrapper}>
          <Image
            source={
            typeof item.image === 'string'
            ? { uri: item.image } 
            : item.image          
        }
        style={styles.storyImage}
    />
          <TouchableOpacity style={styles.removeImage} onPress={() => setImage(null)}>
            <Ionicons name="close-circle" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom Actions */}
      <View style={styles.actionsBar}>
        <Text style={styles.addToPost}>Add to your post</Text>
        <View style={styles.actionIcons}>
          <TouchableOpacity onPress={pickImage}>
            <Ionicons name="image-outline" size={28} color="#4CAF50" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="person-add-outline" size={28} color="#1877F2" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="emoji-emotions" size={28} color="#FFC107" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="location-outline" size={28} color="#F44336" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  postButton: {
    backgroundColor: '#1877F2',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postButtonDisabled: {
    backgroundColor: '#333',
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  audienceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  audienceText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  imagePreviewWrapper: {
    margin: 16,
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  removeImage: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  actionsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  addToPost: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  actionIcons: {
    flexDirection: 'row',
    gap: 16,
  },
});