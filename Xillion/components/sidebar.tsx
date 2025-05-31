// components/Sidebar.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';

type Message = {
  role: "user" | "ai";
  text: string;
};

type ChatHistory = {
  id: string;
  title: string;
  messages: Message[];
  timestamp: number;
};

type SidebarProps = {
  onClose: () => void;
  chatHistory: ChatHistory[];
  onChatSelect: (chat: ChatHistory) => void;
};

export default function Sidebar({ onClose, chatHistory, onChatSelect }: SidebarProps) {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chat History</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Feather name="x" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.chatList}>
        {chatHistory.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            style={styles.chatItem}
            onPress={() => onChatSelect(chat)}
          >
            <MaterialIcons name="chat" size={20} color="#666" />
            <View style={styles.chatInfo}>
              <Text style={styles.chatTitle} numberOfLines={1}>
                {chat.title}
              </Text>
              <Text style={styles.chatDate}>
                {formatDate(chat.timestamp)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '80%',
    backgroundColor: '#fff',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  closeButton: {
    padding: 5,
  },
  chatList: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  chatInfo: {
    marginLeft: 10,
    flex: 1,
  },
  chatTitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
  },
  chatDate: {
    fontSize: 12,
    color: '#666',
  },
});
