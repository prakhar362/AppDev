// components/Sidebar.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function Sidebar({ onClose }: { onClose: () => void }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Xillion</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Feather name="chevron-left" size={20} color="#111" />
        </TouchableOpacity>
      </View>

      {/* New Chat */}
      <TouchableOpacity style={styles.newChatButton}>
        <Text style={styles.newChatText}>＋ New Chat</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Recent Chats */}
      <ScrollView style={styles.chats}>
        <Text style={styles.sectionTitle}>Recent Chats</Text>
        <Text style={styles.sectionSubtitle}>Today</Text>

        {[
          'Fundamental and Technical An...',
          'Impact of Trump Tariffs on Indi...',
        ].map((title, index) => (
          <TouchableOpacity key={index} style={styles.chatItem}>
            <Text style={styles.chatTitle}>{title}</Text>
            <Text style={styles.chatTime}>about 2 hours ago</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.endMessage}>
          You have reached the end of your chat history.
        </Text>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.version}>Xillion AI Assistant v1.0</Text>
        <TouchableOpacity style={styles.profile}>
          <View style={styles.avatar} />
          <Text style={styles.profileName}>Guest</Text>
          <Feather name="chevron-down" size={16} color="#111" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 280,
    backgroundColor: '#f9f9f9',
    paddingTop: 50,
    paddingHorizontal: 16,
    zIndex: 999,
    borderRightWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },
  closeButton: {
    padding: 6,
    backgroundColor: '#eaeaea',
    borderRadius: 6,
  },
  newChatButton: {
    backgroundColor: '#333',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  newChatText: {
    color: '#eee',
    fontSize: 16,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 20,
  },
  chats: {
    flexGrow: 1,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 10,
  },
  chatItem: {
    marginBottom: 16,
  },
  chatTitle: {
    fontSize: 14,
    color: '#222',
    fontWeight: '500',
  },
  chatTime: {
    fontSize: 12,
    color: '#999',
  },
  endMessage: {
    marginTop: 20,
    fontSize: 12,
    color: '#888',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
    paddingBottom: 20,
  },
  version: {
    fontSize: 11,
    color: '#999',
    marginBottom: 10,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'linear-gradient(to right, limegreen, dodgerblue)',
  },
  profileName: {
    fontSize: 14,
    color: '#111',
    flex: 1,
  },
});
