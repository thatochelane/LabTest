import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { initialNotifications } from '../data/data';

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState('All');

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const markRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const deleteNotif = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const displayed =
    activeTab === 'All' ? notifications : notifications.filter((n) => n.unread);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.iconCircle} onPress={markAllRead}>
          <Ionicons name="checkmark-done" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {['All', 'Unread'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.filterBtn, activeTab === tab && styles.filterActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.filterText, activeTab === tab && styles.filterActiveText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={displayed}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No notifications</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.notifItem, item.unread && styles.unreadItem]}
            onPress={() => markRead(item.id)}
          >
            
            <Image
              source={
                typeof item.avatar === 'string'
                ? { uri: item.avatar } 
                : item.avatar          
            }
              style={styles.avatar}
          />
            <View style={styles.notifInfo}>
              <Text style={styles.notifText}>{item.text}</Text>
              <Text style={[styles.notifTime, item.unread && styles.unreadTime]}>
                {item.time}
              </Text>
            </View>
            {item.unread && <View style={styles.unreadDot} />}
            <TouchableOpacity onPress={() => deleteNotif(item.id)}>
              <Ionicons name="close" size={18} color="#aaa" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
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
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconCircle: {
    backgroundColor: '#3a3a3a',
    borderRadius: 20,
    padding: 8,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 8,
  },
  filterBtn: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#3a3a3a',
  },
  filterActive: {
    backgroundColor: '#1877F2',
  },
  filterText: {
    color: '#aaa',
    fontWeight: '600',
    fontSize: 14,
  },
  filterActiveText: {
    color: '#fff',
  },
  emptyText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 15,
  },
  notifItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 12,
  },
  unreadItem: {
    backgroundColor: '#1e2a3a',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  notifInfo: {
    flex: 1,
  },
  notifText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  notifTime: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 4,
  },
  unreadTime: {
    color: '#1877F2',
    fontWeight: 'bold',
  },
  unreadDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#1877F2',
  },
});