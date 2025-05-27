import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  withTiming, 
  useAnimatedStyle,
  withSequence,
  withDelay,
  Easing,
  cancelAnimation,
  runOnJS
} from 'react-native-reanimated';

interface AnimatedNumbersProps {
  value: number;
  duration?: number;
  style?: any;
}

const AnimatedNumbers: React.FC<AnimatedNumbersProps> = ({ 
  value, 
  duration = 3000,
  style 
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Reset state
    setDisplayValue(0);
    setIsAnimating(true);

    // Calculate the interval based on duration and target value
    const interval = duration / value;
    let currentValue = 0;

    const counter = setInterval(() => {
      currentValue += 1;
      if (currentValue <= value) {
        setDisplayValue(currentValue);
      } else {
        clearInterval(counter);
        setIsAnimating(false);
      }
    }, interval);

    // Cleanup function
    return () => {
      clearInterval(counter);
      setDisplayValue(0);
      setIsAnimating(false);
    };
  }, [value, duration]); // Add dependencies to ensure effect runs when these change

  const animatedText = useAnimatedStyle(() => {
    return {
      opacity: 1,
      transform: [{ scale: 1 }],
    };
  });

  return (
    <Animated.Text style={[styles.text, style, animatedText]}>
      {displayValue}%
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
});

export default AnimatedNumbers; 