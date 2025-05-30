import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  TextInput,
} from "react-native";
import {
  MaterialIcons,
  Entypo,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";
import Sidebar from "../components/sidebar"; // Adjust path if needed

export default function Chat() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [inputMessage, setInputMessage] = useState(""); // New state for Ask Xillion input

  const handleSend = () => {
    if (inputMessage.trim()) {
      console.log("User Query:", inputMessage);
      setInputMessage("");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {sidebarVisible && <Sidebar onClose={() => setSidebarVisible(false)} />}

      <ScrollView contentContainerStyle={styles.container}>
        {/* Top row */}
        <View style={styles.topRow}>
          <TouchableOpacity onPress={() => setSidebarVisible(true)} style={styles.iconBox}>
            <Feather name="sidebar" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.newChatButton}>
            <Feather name="plus" size={16} color="#000" />
            <Text style={styles.newChatText}>New Chat</Text>
          </TouchableOpacity>
        </View>

        {/* Heading */}
        <Text style={styles.title}>
          Need real-time analysis to make{"\n"}informed decisions?
        </Text>

        {/* Ask card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Ask Xillion AI!</Text>
            <Entypo name="chevron-up" size={20} color="white" />
          </View>

          {/* Input Box */}
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
              <MaterialIcons name="attach-file" size={16} color="white" />
              <Text style={styles.actionText}>Attachment</Text>
            </View>
            <View style={styles.actionItem}>
              <FontAwesome5 name="brain" size={16} color="white" />
              <Text style={styles.actionText}>Reason</Text>
            </View>
            <View style={styles.actionItem}>
              <MaterialIcons name="insert-chart" size={16} color="white" />
              <Text style={styles.actionText}>Report</Text>
            </View>
          </View>
        </View>

        {/* Suggestions */}
        <View style={styles.suggestions}>
          {[
            "Analyse KPIGREEN stock fundamentally & technically",
            "How does Trump tariff's affect Indian markets?",
            "Impact of UK-India FTA deal",
          ].map((text, index) => (
            
            <TouchableOpacity key={index} style={styles.suggestionButton}>
              <Text style={styles.suggestionText}>{text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight! + 10 : 50,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
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
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
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
});
