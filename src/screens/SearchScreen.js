import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { allUsers, initialPosts } from '../data/data';
import { getGlobalPosts } from './HomeScreen';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('People');

  const filteredPeople = allUsers.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPosts = getGlobalPosts().filter((p) =>
    p.content.toLowerCase().includes(query.toLowerCase()) ||
    p.username.toLowerCase().includes(query.toLowerCase())
  );

  const [followed, setFollowed] = useState({});

  const toggleFollow = (id) => {
    setFollowed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarWrapper}>
        <Ionicons name="search" size={18} color="#aaa" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Facebook"
          placeholderTextColor="#aaa"
          value={query}
          onChangeText={setQuery}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Ionicons name="close-circle" size={18} color="#aaa" />
          </TouchableOpacity>
        )}
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {['People', 'Posts'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Results */}
      {activeTab === 'People' ? (
        <FlatList
          data={filteredPeople}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No people found</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.personItem}>
              <Image
                source={
                  typeof item.avatar === 'string'
                  ? { uri: item.avatar } 
                  : item.avatar          
        }
      style={styles.avatar}
    />
              <View style={styles.personInfo}>
                <Text style={styles.personName}>{item.name}</Text>
                <Text style={styles.mutualText}>{item.mutualFriends} mutual friends</Text>
              </View>
              <TouchableOpacity
                style={[styles.followBtn, followed[item.id] && styles.followingBtn]}
                onPress={() => toggleFollow(item.id)}
              >
                <Text style={styles.followBtnText}>
                  {followed[item.id] ? 'Following' : 'Follow'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No posts found</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.postResult}>
              <Image
                source={
                  typeof item.avatar === 'string'
                  ? { uri: item.avatar } 
                  : item.avatar          
          }
        style={styles.avatar}
      />
              <View style={styles.postInfo}>
                <Text style={styles.postUsername}>{item.username}</Text>
                <Text style={styles.postContent} numberOfLines={2}>{item.content}</Text>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    marginHorizontal: 16,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 12,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#3a3a3a',
  },
  tabActive: {
    backgroundColor: '#1877F2',
  },
  tabText: {
    color: '#aaa',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#fff',
  },
  emptyText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 15,
  },
  personItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  personInfo: {
    flex: 1,
  },
  personName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  mutualText: {
    color: '#aaa',
    fontSize: 13,
    marginTop: 2,
  },
  followBtn: {
    backgroundColor: '#1877F2',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 8,
  },
  followingBtn: {
    backgroundColor: '#3a3a3a',
  },
  followBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  postResult: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  postAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  postInfo: {
    flex: 1,
  },
  postUsername: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  postContent: {
    color: '#aaa',
    fontSize: 13,
    lineHeight: 18,
  },
});