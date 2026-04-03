import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import PostCard from '../components/PostCard';
import { currentUser } from '../data/data';
import { getGlobalPosts } from './HomeScreen';

export default function ProfileScreen() {
  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio);
  const [editModal, setEditModal] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [tempBio, setTempBio] = useState(bio);

  const myPosts = getGlobalPosts().filter((p) => p.username === name || p.username === currentUser.name);

  const saveProfile = () => {
    setName(tempName);
    setBio(tempBio);
    setEditModal(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={myPosts}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Cover Photo */}
            <View style={styles.coverWrapper}>
              <Image
                source={
                  typeof currentUser.cover === 'string'
                  ? { uri: currentUser.cover }
                  : currentUser.cover
        }
        style={styles.coverPhoto}
      />
              <View style={styles.avatarWrapper}>
                <Image
                  source={
                    typeof currentUser.avatar === 'string'
                    ? { uri: currentUser.avatar } 
                    : currentUser.avatar          
          }
        style={styles.avatar}
      />
              </View>
            </View>

            {/* Profile Info */}
            <View style={styles.profileInfo}>
              <Text style={styles.username}>{name}</Text>
              <Text style={styles.bio}>{bio}</Text>

              {/* Friends */}
              <View style={styles.friendsRow}>
                <Ionicons name="people" size={18} color="#aaa" />
                <Text style={styles.friendsText}>{currentUser.friends} Friends</Text>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.editBtn} onPress={() => {
                  setTempName(name);
                  setTempBio(bio);
                  setEditModal(true);
                }}>
                  <Ionicons name="pencil" size={16} color="#fff" />
                  <Text style={styles.editBtnText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.moreBtn}>
                  <Ionicons name="chevron-down" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.divider} />
            <View style={styles.postsHeader}>
              <Text style={styles.postsTitle}>My Posts</Text>
            </View>

            {myPosts.length === 0 && (
              <Text style={styles.emptyText}>No posts yet. Go add one! 📝</Text>
            )}
          </>
        }
        renderItem={({ item }) => <PostCard post={item} />}
      />

      {/* Edit Profile Modal */}
      <Modal visible={editModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <Text style={styles.modalLabel}>Name</Text>
            <TextInput
              style={styles.modalInput}
              value={tempName}
              onChangeText={setTempName}
              placeholderTextColor="#aaa"
            />

            <Text style={styles.modalLabel}>Bio</Text>
            <TextInput
              style={[styles.modalInput, styles.modalBioInput]}
              value={tempBio}
              onChangeText={setTempBio}
              multiline
              placeholderTextColor="#aaa"
            />

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setEditModal(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  coverWrapper: {
    position: 'relative',
    marginBottom: 60,
  },
  coverPhoto: {
    width: '100%',
    height: 200,
  },
  avatarWrapper: {
    position: 'absolute',
    bottom: -50,
    left: 16,
    borderWidth: 4,
    borderColor: '#1a1a1a',
    borderRadius: 52,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileInfo: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  username: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  bio: {
    color: '#aaa',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  friendsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
  },
  friendsText: {
    color: '#aaa',
    fontSize: 14,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  editBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3a3a3a',
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  editBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  moreBtn: {
    backgroundColor: '#3a3a3a',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  postsHeader: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  postsTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#242424',
    borderRadius: 16,
    padding: 24,
    width: '88%',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalLabel: {
    color: '#aaa',
    fontSize: 13,
    marginBottom: 6,
  },
  modalInput: {
    backgroundColor: '#3a3a3a',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 14,
  },
  modalBioInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 4,
  },
  cancelBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#3a3a3a',
  },
  cancelBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  saveBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#1877F2',
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});