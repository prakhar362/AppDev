import { Text, View, StyleSheet, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function History() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: 60 + insets.bottom }]}>
      <LinearGradient
        colors={["#C525FF", "#391EDC"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <Text style={styles.headerTitle}>History</Text>
      </LinearGradient>
      
      <View style={styles.content}>
        <Text style={styles.text}>Trading History will appear here</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#21083a",
  },
  header: {
    padding: 30,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
  },
}); 