import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function PostCard({ post, onDelete }) {
  const [liked, setLiked] = useState(post.liked || false);
  const [likes, setLikes] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const [commentText, setCommentText] = useState('');
  const [commentList, setCommentList] = useState([]);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleAddComment = () => {
  if (!commentText.trim()) return;

  const newComment = {
    id: Date.now().toString(),
    text: commentText,
  };

  setCommentList([newComment, ...commentList]);
  setComments(comments + 1);
  setCommentText('');
};

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.cardHeader}>
      
    <Image 
      source={
        typeof post.avatar === 'string'
        ? { uri: post.avatar } 
        : post.avatar          
    } 
  style={styles.avatar} 
/>
        <View style={styles.headerInfo}>
          <Text style={styles.username}>{post.username}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.time}>{post.time} · </Text>
            <Ionicons name="globe-outline" size={12} color="#aaa" />
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={20} color="#aaa" />
          </TouchableOpacity>
          {onDelete && (
            <TouchableOpacity onPress={() => onDelete(post.id)}>
              <Ionicons name="close" size={20} color="#aaa" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Content */}
      <Text style={styles.content}>{post.content}</Text>

      {/* Image */}
      {post.image && (
        <Image source={{ uri: post.image }} style={styles.postImage} />
      )}

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.reactionIcons}>
          <View style={[styles.reactionDot, { backgroundColor: liked ? '#1877F2' : '#555' }]}>
            <Ionicons name="thumbs-up" size={10} color="#fff" />
          </View>
          <Text style={styles.statsText}>{likes}</Text>
        </View>
        <Text style={styles.statsText}>{comments} comments · {post.shares} shares</Text>
      </View>

      <View style={styles.divider} />

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={handleLike}>
          <Ionicons
            name={liked ? 'thumbs-up' : 'thumbs-up-outline'}
            size={20}
            color={liked ? '#1877F2' : '#aaa'}
          />
          <Text style={[styles.actionText, liked && { color: '#1877F2' }]}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => setShowComments(!showComments)}>
          <Ionicons name="chatbubble-outline" size={20} color="#aaa" />
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="arrow-redo-outline" size={20} color="#aaa" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>

      {/* Comment Section Toggle */}
      {showComments && (
        <View style={styles.commentSection}>
          <View style={styles.commentInputRow}>
  <TextInput
    style={styles.commentInput}
    placeholder="Write a comment..."
    placeholderTextColor="#aaa"
    value={commentText}
    onChangeText={setCommentText}
  />
  <TouchableOpacity onPress={handleAddComment}>
    <Ionicons name="send" size={20} color="#1877F2" />
  </TouchableOpacity>
  </View>

  {/* Comments List */}
  {commentList.map((c) => (
  <View key={c.id} style={styles.commentItem}>
    <Text style={styles.commentText}>{c.text}</Text>
  </View>
  ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#242424',
    marginBottom: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  headerInfo: {
    flex: 1,
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  time: {
    color: '#aaa',
    fontSize: 12,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  content: {
    color: '#e0e0e0',
    fontSize: 15,
    paddingHorizontal: 12,
    paddingBottom: 10,
    lineHeight: 22,
  },
  postImage: {
    width: '100%',
    height: 250,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  reactionIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reactionDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsText: {
    color: '#aaa',
    fontSize: 13,
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginHorizontal: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 6,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  actionText: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: '600',
  },
  commentSection: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  commentPlaceholder: {
    color: '#aaa',
    fontSize: 13,
  },
  commentInputRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
  marginBottom: 10,
},

commentInput: {
  flex: 1,
  backgroundColor: '#333',
  borderRadius: 20,
  paddingHorizontal: 12,
  paddingVertical: 6,
  color: '#fff',
},

commentItem: {
  backgroundColor: '#333',
  padding: 8,
  borderRadius: 10,
  marginTop: 6,
},

commentText: {
  color: '#fff',
  fontSize: 13,
},
});