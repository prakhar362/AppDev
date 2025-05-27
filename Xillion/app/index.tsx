import { Text, View, StyleSheet, ScrollView, TouchableOpacity, ColorValue, Alert, Platform } from "react-native";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { SwipeButton } from "react-native-expo-swipe-button";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const insets = useSafeAreaInsets();
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
  };

  return (
    <View style={[styles.container, { paddingBottom: 60 + insets.bottom }]}>
     
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
           <Feather name="refresh-ccw" size={18} style={styles.refresh} color="#fff" />
        </View>


        <Text style={styles.unusedFundsTitle}>Unused Funds</Text>
        <Text style={styles.unusedFundsValue}>₹1,18,261</Text>
        </View>


      </LinearGradient>


      {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            {/* Portfolio Icon */}
            <MaterialCommunityIcons name="folder-multiple" size={18} color="#fff" />
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
    {/* Top Row: Name and Change % */}
    <View style={styles.headerRow}>
      <Text style={styles.recommendationName}>{item.name}</Text>
      <Text
        style={[
          styles.recommendationChange,
          { color: item.change.startsWith('+') ? '#00FF00' : '#FF0000' },
        ]}
      >
        {item.change}
      </Text>
    </View>


    {/* Bottom Row: Buy / Stop Loss / Target */}
    <View style={styles.recommendationDetails}>
      <View style={styles.recommendationDetailItem}>
        <Text style={styles.recommendationDetailTitle}>Buy</Text>
        <Text style={styles.recommendationDetailValue}>{item.buy}</Text>
      </View>
      <View style={styles.recommendationDetailItem}>
        <Text style={styles.recommendationDetailTitle}>Stop Loss</Text>
        <Text style={styles.recommendationDetailValue}>{item.stopLoss}</Text>
      </View>
      <View style={styles.recommendationDetailItem}>
        <Text style={styles.recommendationDetailTitle}>Target</Text>
        <Text style={styles.recommendationDetailValue}>{item.target}</Text>
      </View>
    </View>
  </View>
          </LinearGradient>
        ))}
      </ScrollView>


      {/* Execution Note */}
      <Text style={styles.executionNote}>
        On executing this basket, buy orders along with stop loss and targets will be placed.
      </Text>
       
      </View>
     


      {/* Execute Button */}
      <View style={styles.executeButtonContainer}>
        <SwipeButton
           onComplete={handleExecute}
           title="EXECUTE"
           containerStyle={styles.swipeButtonContainer}
           titleStyle={styles.swipeButtonTitle}
           circleBackgroundColor="#fff"
           Icon={
            <MaterialCommunityIcons name="lightning-bolt" size={30} color="#000" />
           }
           height={50}
           borderRadius={50}
           circleSize={60}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#21083a", // Dark theme background
  },
  upperSection: {
    padding: 30,
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
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
    paddingLeft:5,
    marginLeft:10,
  },
  refresh:{
  marginTop:10,
  marginLeft:5,
  },
  unusedFundsTitle: {
    fontSize: 14,
    color: "#eee",
    marginBottom: 4,
  },
  unusedFundsValue: {
    fontSize: 18,
    color: "#fff",
    fontWeight:'bold',
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
    backgroundColor: "#080139", // Darker button background
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
  recommendContainer: {
  flex: 1, // Takes available vertical space
  backgroundColor: '#a1a1a1',
  borderRadius: 20,
  margin: 8,
  paddingTop: 10,
  overflow: 'hidden',
},


recommendationsList: {
  paddingHorizontal: 0, // No horizontal padding
  paddingVertical: 10,
  maxHeight: 350, // You can tweak this height
},


recommendationItem: {
  borderRadius: 12,
  marginHorizontal: 10,
  marginBottom: 8,
  padding: 10,
},


recommendationItemContent: {
  flexDirection: "column",
},


headerRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 8,
},


recommendationName: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#fff",
},


recommendationChange: {
  fontSize: 20,
  fontWeight: "normal",
},


recommendationDetails: {
  flexDirection: "row",
  justifyContent: "space-between",
},


recommendationDetailItem: {
  flex: 1,
  alignItems: "center",
},


recommendationDetailTitle: {
  fontSize: 12,
  color: "#eee",
  marginBottom: 4,
},


recommendationDetailValue: {
  fontSize: 14,
  color: "#fff",
  fontWeight: "bold",
},


executionNote: {
  color: "#fff",
  fontSize: 13,
  textAlign: "center",
  marginTop: 10,
  marginBottom: 16,
  marginHorizontal: 10,
},


  executeButtonContainer: {
    padding: 6,
  },
 
  swipeButtonContainer: { // Added style for the swipe button container
     width: "100%",
     backgroundColor: "#D3D3D3", // Light gray background
     borderRadius: 25,
  },
  swipeButtonTitle: {
      fontSize: 20,
      fontWeight: "semibold",
      color: "#000",
  },
});
