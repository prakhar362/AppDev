import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import {
  MaterialIcons,
  Entypo,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sidebar from "../components/sidebar";
import { getGeminiResponse } from "../lib/gemini";

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

export default function Chat() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [conversation, setConversation] = useState<Message[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);

  useEffect(() => {
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('chatHistory');
      if (history) {
        setChatHistory(JSON.parse(history));
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };


  const handleNewChat = async () => {
    if (conversation.length > 0) {
      // Create a title from the first user message
      const firstUserMessage = conversation.find(msg => msg.role === "user")?.text || "New Chat";
      const title = firstUserMessage.length > 30 
        ? firstUserMessage.substring(0, 30) + "..."
        : firstUserMessage;

      const newChat: ChatHistory = {
        id: Date.now().toString(),
        title,
        messages: [...conversation],
        timestamp: Date.now(),
      };

      // Getting existing history from AsyncStorage
      try {
        const existingHistory = await AsyncStorage.getItem('chatHistory');
        const currentHistory: ChatHistory[] = existingHistory ? JSON.parse(existingHistory) : [];
        
        const updatedHistory = [newChat, ...currentHistory];
        
        // Save new one
        await AsyncStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
        setChatHistory(updatedHistory);
      } catch (error) {
        console.error('Error updating chat history:', error);
      }
    }

    // Reset
    setConversation([]);
    setShowSuggestions(true);
    setInputMessage("");
  };

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: Message = { role: "user", text: inputMessage.trim() };
    setConversation(prev => [...prev, newUserMessage]);
    setInputMessage("");
    setShowSuggestions(false);
    setIsLoading(true);

    try {
      const aiReply = await getGeminiResponse(inputMessage.trim());
      const newAiMessage: Message = { role: "ai", text: aiReply };
      setConversation(prev => [...prev, newAiMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage: Message = { 
        role: "ai", 
        text: "Sorry, I encountered an error. Please try again." 
      };
      setConversation(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionPress = async (text: string) => {
    setInputMessage(text);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#fff" }}
    >
      {sidebarVisible && (
        <Sidebar 
          onClose={() => setSidebarVisible(false)} 
          chatHistory={chatHistory}
          onChatSelect={(chat) => {
            setConversation(chat.messages);
            setShowSuggestions(false);
            setSidebarVisible(false);
          }}
        />
      )}

      <View style={styles.mainContainer}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Top row */}
          <View style={styles.topRow}>
            <TouchableOpacity onPress={() => setSidebarVisible(true)} style={styles.iconBox}>
              <Feather name="sidebar" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.newChatButton}
              onPress={handleNewChat}
            >
              <Feather name="plus" size={16} color="#000" />
              <Text style={styles.newChatText}>New Chat</Text>
            </TouchableOpacity>
          </View>

          {/* Heading */}
          <Text style={styles.title}>
            Need real-time analysis to make{"\n"}informed decisions?
          </Text>

          {/* Chat bubbles */}
          {conversation.map((msg, idx) => (
            <View
              key={idx}
              style={[
                styles.chatBubble,
                msg.role === "user" ? styles.userBubble : styles.aiBubble,
              ]}
            >
              {msg.role === "ai" && (
                <View style={styles.sparkle}>
                  <FontAwesome5 name="magic" size={12} color="#555" />
                </View>
              )}
              <Text style={[
                styles.chatText,
                msg.role === "user" ? styles.userChatText : styles.aiChatText
              ]}>
                {msg.text}
              </Text>
            </View>
          ))}

          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#C426FF" />
              <Text style={styles.loadingText}>Thinking...</Text>
            </View>
          )}

          {/* Suggestions */}
          {showSuggestions && (
            <View style={styles.suggestions}>
              {[
                "Analyse KPIGREEN stock fundamentally & technically",
                "How does Trump tariff's affect Indian markets?",
                "Impact of UK-India FTA deal",
              ].map((text, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.suggestionButton}
                  onPress={() => handleSuggestionPress(text)}
                >
                  <Text style={styles.suggestionText}>{text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Input Card */}
        <View style={styles.inputCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Ask Xillion AI!</Text>
            <Entypo name="chevron-up" size={20} color="white" />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Type your question here..."
            placeholderTextColor="#aaa"
            value={inputMessage}
            onChangeText={setInputMessage}
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />

          <View style={styles.actions}>
            <View style={styles.actionItem}>
              <MaterialIcons name="attach-file" size={18} color="white" />
              <Text style={styles.actionText}>Attachment</Text>
            </View>
            <View style={styles.actionItem}>
              <FontAwesome5 name="brain" size={18} color="white" />
              <Text style={styles.actionText}>Reason</Text>
            </View>
            <View style={styles.actionItem}>
              <MaterialIcons name="insert-chart" size={18} color="white" />
              <Text style={styles.actionText}>Report</Text>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight! + 10 : 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  iconBox: {
    padding: 6,
    backgroundColor: "#f0f0f0",
    borderRadius: 6,
  },
  newChatButton: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: "center",
    gap: 6,
  },
  newChatText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color: "#111",
    marginBottom: 20,
  },
  inputCard: {
    backgroundColor: "#1a1a1a",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    paddingBottom: Platform.OS === "ios" ? 60 : 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#2a2a2a",
    color: "#fff",
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === "ios" ? 12 : 10,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#444",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionItem: {
    alignItems: "center",
  },
  actionText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },
  suggestions: {
    gap: 10,
    marginTop: 10,
  },
  suggestionButton: {
    backgroundColor: "#5c5c5c",
    borderRadius: 8,
    padding: 15,
  },
  suggestionText: {
    color: "#fff",
    fontSize: 14,
  },
  chatBubble: {
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    marginBottom: 5,
    maxWidth: "80%",
  },
  userBubble: {
    backgroundColor: "#000",
    alignSelf: "flex-end",
  },
  aiBubble: {
    backgroundColor: "#f5f5f5",
    alignSelf: "flex-start",
    position: "relative",
  },
  chatText: {
    fontSize: 14,
  },
  userChatText: {
    color: "#fff",
  },
  aiChatText: {
    color: "#000",
  },
  sparkle: {
    position: "absolute",
    top: 8,
    left: 8,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    gap: 8,
  },
  loadingText: {
    color: "#C426FF",
    fontSize: 14,
  },
});
