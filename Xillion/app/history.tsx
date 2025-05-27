import { Text, View, StyleSheet, ScrollView, Platform, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { useState, useMemo, useEffect } from 'react';
import AnimatedNumbers from '../components/AnimatedNumbers';

// Dummy data structure for Trade History
const tradeHistoryData = [
  {
    stockName: "CDSL",
    companyName: "Central Depository Services (India) Ltd.",
    buyPrice: "₹250",
    investedAmount: "₹5000",
    quantity: 20,
    status: "Closed",
    profitPercentage: "+10.8%",
    profitAmount: "₹540",
    targetHitDate: "15 Oct 2024 09:16 am",
    tradeType: "Medium Term",
    tradeDate: "9 Oct 2024 11:39 am",
    initial: "C",
    category: "Financials",
  },
  {
    stockName: "CGPOWER",
    companyName: "CG Power and Industrial Solutions Ltd.",
    buyPrice: "₹465",
    investedAmount: "₹9300",
    quantity: 20,
    status: "Closed",
    profitPercentage: "+6.3%",
    profitAmount: "₹586",
    targetHitDate: "10 Oct 2024 09:40 am",
    tradeType: "Short Term",
    tradeDate: "8 Oct 2024 13:51 pm",
    initial: "C",
    category: "Capital Goods",
  },
  {
    stockName: "IOLCP",
    companyName: "IOL Chemicals and Pharmaceuticals Ltd.",
    buyPrice: "₹780",
    investedAmount: "₹15600",
    quantity: 20,
    status: "Ongoing",
    profitPercentage: "+2.5%",
    profitAmount: "₹390",
    targetHitDate: null,
    tradeType: "Short Term",
    tradeDate: "16 Oct 2024 10:00 am",
    initial: "I",
    category: "Chemicals",
  },
  {
    stockName: "RELIANCE",
    companyName: "Reliance Industries Ltd.",
    buyPrice: "₹2400",
    investedAmount: "₹24000",
    quantity: 10,
    status: "Ongoing",
    profitPercentage: "+1.2%",
    profitAmount: "₹288",
    targetHitDate: null,
    tradeType: "Long Term",
    tradeDate: "14 Oct 2024 11:30 am",
    initial: "R",
    category: "Oil & Gas",
  },
  {
    stockName: "TCS",
    companyName: "Tata Consultancy Services Ltd.",
    buyPrice: "₹3500",
    investedAmount: "₹17500",
    quantity: 5,
    status: "Closed",
    profitPercentage: "+8.5%",
    profitAmount: "₹1487",
    targetHitDate: "16 Oct 2024 14:00 pm",
    tradeType: "Short Term",
    tradeDate: "15 Oct 2024 09:00 am",
    initial: "T",
    category: "IT",
  },
  {
    stockName: "INFY",
    companyName: "Infosys Ltd.",
    buyPrice: "₹1500",
    investedAmount: "₹15000",
    quantity: 10,
    status: "Ongoing",
    profitPercentage: "-0.5%",
    profitAmount: "-₹75",
    targetHitDate: null,
    tradeType: "Medium Term",
    tradeDate: "16 Oct 2024 10:30 am",
    initial: "I",
    category: "IT",
  },
  {
    stockName: "LT",
    companyName: "Larsen & Toubro Ltd.",
    buyPrice: "₹2200",
    investedAmount: "₹11000",
    quantity: 5,
    status: "Closed",
    profitPercentage: "+5.0%",
    profitAmount: "₹550",
    targetHitDate: "15 Oct 2024 10:00 am",
    tradeType: "Long Term",
    tradeDate: "14 Oct 2024 09:30 am",
    initial: "L",
    category: "Construction",
  },
  {
    stockName: "CDSL",
    companyName: "Central Depository Services (India) Ltd.",
    buyPrice: "₹250",
    investedAmount: "₹5000",
    quantity: 20,
    status: "Closed",
    profitPercentage: "+10.8%",
    profitAmount: "₹540",
    targetHitDate: "15 Oct 2024 09:16 am",
    tradeType: "Medium Term",
    tradeDate: "9 Oct 2024 11:39 am",
    initial: "C",
    category: "Financials",
  },
  {
    stockName: "CGPOWER",
    companyName: "CG Power and Industrial Solutions Ltd.",
    buyPrice: "₹465",
    investedAmount: "₹9300",
    quantity: 20,
    status: "Closed",
    profitPercentage: "+6.3%",
    profitAmount: "₹586",
    targetHitDate: "10 Oct 2024 09:40 am",
    tradeType: "Short Term",
    tradeDate: "8 Oct 2024 13:51 pm",
    initial: "C",
    category: "Capital Goods",
  },
  {
    stockName: "IOLCP",
    companyName: "IOL Chemicals and Pharmaceuticals Ltd.",
    buyPrice: "₹780",
    investedAmount: "₹15600",
    quantity: 20,
    status: "Ongoing",
    profitPercentage: "+2.5%",
    profitAmount: "₹390",
    targetHitDate: null,
    tradeType: "Short Term",
    tradeDate: "16 Oct 2024 10:00 am",
    initial: "I",
    category: "Chemicals",
  },
  {
    stockName: "RELIANCE",
    companyName: "Reliance Industries Ltd.",
    buyPrice: "₹2400",
    investedAmount: "₹24000",
    quantity: 10,
    status: "Ongoing",
    profitPercentage: "+1.2%",
    profitAmount: "₹288",
    targetHitDate: null,
    tradeType: "Long Term",
    tradeDate: "14 Oct 2024 11:30 am",
    initial: "R",
    category: "Oil & Gas",
  },
  {
    stockName: "TCS",
    companyName: "Tata Consultancy Services Ltd.",
    buyPrice: "₹3500",
    investedAmount: "₹17500",
    quantity: 5,
    status: "Closed",
    profitPercentage: "+8.5%",
    profitAmount: "₹1487",
    targetHitDate: "16 Oct 2024 14:00 pm",
    tradeType: "Short Term",
    tradeDate: "15 Oct 2024 09:00 am",
    initial: "T",
    category: "IT",
  },
  {
    stockName: "INFY",
    companyName: "Infosys Ltd.",
    buyPrice: "₹1500",
    investedAmount: "₹15000",
    quantity: 10,
    status: "Ongoing",
    profitPercentage: "-0.5%",
    profitAmount: "-₹75",
    targetHitDate: null,
    tradeType: "Medium Term",
    tradeDate: "16 Oct 2024 10:30 am",
    initial: "I",
    category: "IT",
  },
  {
    stockName: "LT",
    companyName: "Larsen & Toubro Ltd.",
    buyPrice: "₹2200",
    investedAmount: "₹11000",
    quantity: 5,
    status: "Closed",
    profitPercentage: "+5.0%",
    profitAmount: "₹550",
    targetHitDate: "15 Oct 2024 10:00 am",
    tradeType: "Long Term",
    tradeDate: "14 Oct 2024 09:30 am",
    initial: "L",
    category: "Construction",
  },
];

export default function History() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, []);

  const uniqueCategories = useMemo(() => {
    const categories = tradeHistoryData.map(item => item.category);
    return ['All', ...Array.from(new Set(categories))];
  }, []);

  const filteredTrades = useMemo(() => {
    if (selectedCategory === 'All') {
      return tradeHistoryData;
    }
    return tradeHistoryData.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <LinearGradient
        colors={["#C426FF", "#391FDC"]}
        style={[styles.header, { paddingTop: insets.top + 10 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trade History</Text>
      </LinearGradient>

      <View style={styles.mainContent}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>POSITIONAL TRADE HISTORY</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Avg duration</Text>
              <Text style={styles.summaryValue}>59 days</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Avg return ⓘ</Text>
              <View style={styles.returnValueContainer}>
                <Text style={styles.summaryValueGreen}>7.74%</Text>
                <Image 
                  source={require('../assets/images/stockup.gif')}
                  style={styles.stockAnimation}
                />
              </View>
            </View>
            <View style={styles.hitRateContainer}>
              <AnimatedNumbers 
                key={`hitRateAnimation-${animationKey}`}
                value={83} 
                duration={4000}
                style={styles.hitRateValue}
              />
              <Text style={styles.hitRateLabel}>Hit Rate</Text>
            </View>
          </View>
        </View>

        <View style={styles.filterSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryFilterContainer}
          >
            {uniqueCategories.map(category => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.activeCategoryButton
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.activeCategoryButtonText
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.tradesInfoContainer}>
            <View style={styles.tradesCountContainer}>
              <MaterialCommunityIcons name="circle" size={8} color="#4CAF50" />
              <Text style={styles.tradesCountText}>All positional Liquide trades</Text>
            </View>
            <View style={styles.rightInfo}>
              <Text style={styles.tradesCount}>{filteredTrades.length} trades</Text>
              <TouchableOpacity>
                <Text style={styles.sortText}>Sort</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView 
          style={styles.historyList}
          contentContainerStyle={styles.historyListContent}
          showsVerticalScrollIndicator={true}
        >
          {filteredTrades.map((item, index) => (
            <View key={index} style={styles.tradeCard}>
              {item.targetHitDate && (
                <View style={styles.targetHitBadge}>
                  <Text style={styles.targetHitText}>Target Hit: {item.targetHitDate}</Text>
                </View>
              )}
             
              <View style={styles.cardContent}>
                <View style={styles.leftSection}>
                  <View style={styles.stockIcon}>
                    <Text style={styles.stockInitial}>{item.initial}</Text>
                  </View>
                  <View style={styles.stockInfo}>
                    <Text style={styles.stockName}>{item.stockName}</Text>
                    <Text style={styles.companyName}>{item.companyName}</Text>
                  </View>
                </View>
               
                <View style={styles.rightSection}>
                  <View style={styles.profitContainer}>
                    {item.profitPercentage.startsWith('+') ? (
                      <Feather
                        name="trending-up"
                        size={16}
                        color="#4CAF50"
                      />
                    ) : (
                      <Image 
                        source={require('../assets/images/downarrow.gif')}
                        style={styles.stockMovementAnimation}
                      />
                    )}
                    <Text style={[
                      styles.profitPercentage,
                      { color: item.profitPercentage.startsWith('+') ? '#4CAF50' : '#F44336' }
                    ]}>
                      {item.profitPercentage}
                    </Text>
                  </View>
                  <Text style={styles.returnLabel}>Return</Text>
                  <View style={styles.liquideTag}>
                    <Text style={styles.liquideText}>Liquide (SEBI RA)</Text>
                  </View>
                </View>
              </View>
             
              <View style={styles.cardFooter}>
                <View style={styles.tradeTypeContainer}>
                  <Feather name="clock" size={14} color="#666" />
                  <Text style={styles.tradeType}>{item.tradeType}</Text>
                </View>
                <Text style={styles.tradeDate}>{item.tradeDate}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: Platform.OS === 'ios' ? 60 : 30,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  summaryCard: {
    backgroundColor: '#2a2a2a',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  summaryValueGreen: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4CAF50',
  },
  hitRateContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hitRateValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  hitRateLabel: {
    fontSize: 10,
    color: '#000',
    fontWeight: '500',
  },
  filterSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryFilterContainer: {
    paddingVertical: 8,
  },
  categoryButton: {
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  activeCategoryButton: {
    backgroundColor: '#9C27B0',
  },
  categoryButtonText: {
    color: '#ccc',
    fontSize: 14,
    fontWeight: '500',
  },
  activeCategoryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  tradesInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  tradesCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tradesCountText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 6,
  },
  rightInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  tradesCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  sortText: {
    fontSize: 14,
    color: '#999',
  },
  historyList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  historyListContent: {
    paddingBottom: 20,
  },
  tradeCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  targetHitBadge: {
    backgroundColor: '#4CAF50',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  targetHitText: {
    fontSize: 11,
    color: '#000',
    fontWeight: '600',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stockIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stockInitial: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  stockInfo: {
    flex: 1,
  },
  stockName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  companyName: {
    fontSize: 12,
    color: '#999',
    lineHeight: 16,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  profitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  profitPercentage: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 4,
  },
  returnLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 8,
  },
  liquideTag: {
    backgroundColor: '#9C27B0',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  liquideText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  tradeTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tradeType: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  tradeDate: {
    fontSize: 12,
    color: '#999',
  },
  returnValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stockAnimation: {
    width: 40,
    height: 40,
  },
  stockMovementAnimation: {
    width: 24,
    height: 24,
  },
});

