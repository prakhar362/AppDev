import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons, Entypo, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Chat() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>
        Let's uncover opportunities hiding in the market.
      </Text>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Ask Xillion!</Text>
          <Entypo name="chevron-up" size={20} color="white" />
        </View>

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

      <View style={styles.suggestions}>
        {[
          'Analyse KPIGREEN stock fundamentally & technically',
          "How does Trump tariff's affect Indian markets?",
          'Impact of UK-India FTA deal',
        ].map((text, index) => (
          <TouchableOpacity key={index} style={styles.suggestionButton}>
            <Text style={styles.suggestionText}>{text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop:20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#111',
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionItem: {
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  suggestions: {
    gap: 10,
  },
  suggestionButton: {
    backgroundColor: '#5c5c5c',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  suggestionText: {
    color: '#fff',
    fontSize: 14,
  },
}); 