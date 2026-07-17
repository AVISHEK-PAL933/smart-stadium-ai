import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export const SocialWall = ({ posts }: { posts: any[] }) => {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="chatbubbles" size={24} color="#00e5ff" />
        <Text style={styles.title}>Fan Social Wall</Text>
      </View>
      <View style={styles.content}>
        {posts.map((post, idx) => (
          <View key={idx} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.userAvatar}>
                <Ionicons name="person" size={12} color="#fff" />
              </View>
              <Text style={styles.userName}>{post.user}</Text>
              <Text style={styles.postTime}>{post.time}</Text>
            </View>
            <Text style={styles.postText}>{post.text}</Text>
            <View style={styles.postActions}>
              <View style={styles.actionBtn}>
                <Ionicons name="heart-outline" size={16} color="#ff1744" />
                <Text style={styles.actionText}>{post.likes}</Text>
              </View>
              <View style={styles.actionBtn}>
                <Ionicons name="chatbubble-outline" size={16} color="#00e5ff" />
                <Text style={styles.actionText}>{post.comments}</Text>
              </View>
              <View style={styles.actionBtn}>
                <Ionicons name="share-social-outline" size={16} color="#00e676" />
              </View>
            </View>
          </View>
        ))}
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Theme.spacing.m,
    marginBottom: Theme.spacing.l,
    padding: Theme.spacing.m,
    backgroundColor: 'rgba(5, 15, 30, 0.7)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.m,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: Theme.spacing.s,
  },
  content: {
    gap: Theme.spacing.m,
  },
  postCard: {
    padding: Theme.spacing.m,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  userName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
  },
  postTime: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
  },
  postText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: Theme.spacing.m,
  },
  postActions: {
    flexDirection: 'row',
    gap: Theme.spacing.m,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
});
