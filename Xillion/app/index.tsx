import { Text, View, StyleSheet, ScrollView, TouchableOpacity, ColorValue, Alert } from "react-native";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { SwipeButton } from "react-native-expo-swipe-button";
// You might need to install expo-linear-gradient if you are using Expo, or react-native-linear-gradient if not.
// For simplicity, I will use placeholder Views for gradients for now and you can replace them with actual gradient components.

export default function Index() {
  const gradientColorsUpper: [ColorValue, ColorValue] = ["#C525FF", "#391EDC"];
  const gradientColorsRecommendations: [ColorValue, ColorValue] = ["#C426FF", "#391FDC"];

  // Dummy data for recommendations
  const recommendations = [
    {
      name: "ASHOKA",
      buy: "₹248-251",
      stopLoss: "₹223",
      target: "₹273",
      change: "+10%",
    },
    {
      name: "IOLCP",
      buy: "₹460-470",
      stopLoss: "₹350",
      target: "₹520",
      change: "+19%",
    },
    {
      name: "GENESYS",
      buy: "₹775-786",
      stopLoss: "₹698",
      target: "₹852",
      change: "+8.3%",
    },
    // Add more recommendation objects here
  ];

  const handleExecute = () => {
    // This function will be called when the swipe is complete
    Alert.alert("Execute", "Executing trades...");
    // You can add your trade execution logic here
  };

  return (
    <View style={styles.container}>
      
      {/* Upper Section with Gradient */}
      <LinearGradient
        colors={gradientColorsUpper}
        style={styles.upperSection}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          {/* Profile Icon */}
          <Feather name="user" size={24} color="#fff" />
          <Text style={styles.headerTitle}>XILLION</Text>
          {/* Notifications Icon */}
          <Feather name="bell" size={24} color="#fff" />
        </View>
        
        {/*Portfolio section */}
        <View style={styles.portfolioSection}>
          <Text style={styles.portfolioTitle}>Current Portfolio</Text>
        <View style={styles.portfolioValueContainer}>
           <Text style={styles.portfolioValue}>₹12,78,653</Text>
           {/* Refresh Icon */}
           <Feather name="refresh-ccw" size={18} color="#fff" />
        </View>

        <Text style={styles.unusedFundsTitle}>Unused Funds</Text>
        <Text style={styles.unusedFundsValue}>₹1,18,261</Text>
        </View>

      </LinearGradient>

      {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            {/* Portfolio Icon */}
            <MaterialCommunityIcons name="folder" size={18} color="#fff" />
            <Text style={styles.actionButtonText}>Portfolio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
             {/* Ask AI Icon */}
            <MaterialCommunityIcons name="message-processing" size={18} color="#fff" />
            <Text style={styles.actionButtonText}>Ask AI</Text>
          </TouchableOpacity>
        </View>

      {/* Today's Recommendations Section */}
      <Text style={styles.recommendationsTitle}>Today's Recommendations</Text>

      <View style={styles.recommendContainer}>
        
      </View>
      {/* Recommendations List - Scrollable */}
      <ScrollView style={styles.recommendationsList}>
        {recommendations.map((item, index) => (
          <LinearGradient
            key={index}
            colors={gradientColorsRecommendations}
            style={styles.recommendationItem}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.recommendationItemContent}>
              <View>
                <Text style={styles.recommendationName}>{item.name}</Text>
                <Text style={styles.recommendationBuy}>Buy: {item.buy}</Text>
              </View>
              <View style={styles.recommendationDetails}>
                <View style={styles.recommendationDetailItem}>
                   <Text style={styles.recommendationDetailTitle}>Stop Loss</Text>
                   <Text style={styles.recommendationDetailValue}>{item.stopLoss}</Text>
                </View>
                 <View style={styles.recommendationDetailItem}>
                   <Text style={styles.recommendationDetailTitle}>Target</Text>
                   <Text style={styles.recommendationDetailValue}>{item.target}</Text>
                </View>
              </View>
               <Text style={[styles.recommendationChange, { color: item.change.startsWith('+') ? '#00FF00' : '#FF0000' }]}>{item.change}</Text>
            </View>
          </LinearGradient>
        ))}
      </ScrollView>

      {/* Execution Note */}
      <Text style={styles.executionNote}>
        On executing this basket, buy orders along with stop loss and targets will be placed.
      </Text>

      

      {/* Execute Button */}
      <View style={styles.executeButtonContainer}>
        <SwipeButton
           onComplete={handleExecute}
           title="EXECUTE"
           containerStyle={styles.swipeButtonContainer}
           titleStyle={styles.swipeButtonTitle}
           circleBackgroundColor="#fff"
           Icon={
            <MaterialCommunityIcons name="lightning-bolt" size={24} color="#000" />
           }
           height={50}
           borderRadius={25}
        />
      </View>

      {/* Bottom Navigation Bar Placeholder */}
      {/* Implement Bottom Tab Navigator here */}
      <View style={styles.bottomNavBarPlaceholder} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Dark theme background
  },
  upperSection: {
    padding: 12,
    paddingBottom:40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50, // Adjusted height
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color:"white"
  },



  portfolioSection:{
    alignItems:"center"
  },
  portfolioTitle: {
    fontSize: 16,
    color: "#eee",
    marginBottom: 4,
  },
   portfolioValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  portfolioValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginRight: 8,
  },
  unusedFundsTitle: {
    fontSize: 14,
    color: "#eee",
    marginBottom: 4,
  },
  unusedFundsValue: {
    fontSize: 18,
    color: "#fff",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    marginTop: -10,
    justifyContent: "space-around",
    width: "100%", // Ensure buttons spread out if needed
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2e3240", // Darker button background
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8, // Added margin
  },



  recommendationsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 25,
    marginLeft: 16,
    textAlign:'center'
  },
  recommendContainer:{
    padding:10,
    backgroundColor:'#c0c0c0',
    borderRadius:20,
    
  },
  recommendationsList: {
    flex: 1,
    padding: 16,
  },
  recommendationItem: {
    height: 80,
    borderRadius: 8,
    marginBottom: 12,
    justifyContent: "center",
    padding: 10,
    // Removed background color here as LinearGradient handles it
  },
  recommendationItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recommendationDetails: {
    flexDirection: "row",
    alignItems: "center", // Aligned items to center
  },
  recommendationDetailItem: {
      marginRight: 16,
  },
  recommendationName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  recommendationBuy: {
    fontSize: 14,
    color: "#eee",
  },
  recommendationDetailTitle: {
     fontSize: 12,
     color: "#eee",
     marginBottom: 4,
  },
  recommendationDetailValue: {
     fontSize: 14,
     color: "#fff",
  },
  recommendationChange: {
    fontSize: 16,
    fontWeight: "bold",
    // Color is set dynamically based on value
  },
  executionNote: {
    color: "#ccc",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  executeButtonContainer: {
    padding: 16,
  },
  swipeButtonContainer: { // Added style for the swipe button container
     width: "100%",
     backgroundColor: "#D3D3D3", // Light gray background
     borderRadius: 25,
  },
  swipeButtonTitle: { // Added style for the swipe button title
      fontSize: 18,
      fontWeight: "bold",
      color: "#000", // Black text color
  },
  bottomNavBarPlaceholder: {
    height: 60,
    backgroundColor: "#222", // Placeholder for bottom nav bar
  },
});
