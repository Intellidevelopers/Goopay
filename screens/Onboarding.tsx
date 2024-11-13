import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Animated, TouchableOpacity, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import colors from '../components/colors';

const { width } = Dimensions.get('window');

type OnboardingItem = {
  id: string;
  title: string;
  description: string;
  image: any;
};

type OnboardingProps = {
  navigation: NativeStackNavigationProp<any>;
};

const onboardingData: OnboardingItem[] = [
  {
    id: '1',
    title: 'Budgeting Redefined!',
    description: 'Take control of your spending, set goals, and watch your financial dreams come to life. Our intuitive budgeting feature empowers you to manage your money with precision.',
    image: require('../assets/cuate.png'), // Add your images here
  },
  {
    id: '2',
    title: 'Track Your Expenses',
    description: 'Monitor your expenses effortlessly and identify areas where you can save more.',
    image: require('../assets/amico.png'),
  },
  {
    id: '3',
    title: 'Achieve Financial Freedom',
    description: 'Make informed financial decisions and achieve your goals with ease.',
    image: require('../assets/pana.png'),
  },
];

const Onboarding: React.FC<OnboardingProps> = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
      setCurrentIndex(currentIndex + 1); // Update the currentIndex state
    } else {
      navigation.replace('Signup'); // Navigate to the Home screen or main screen after onboarding
    }
  };
  

  const handleSkip = () => {
    navigation.replace('Signup'); // Navigate directly to the Home screen or main screen
  };

  const renderItem = ({ item }: { item: OnboardingItem }) => (
    <View style={styles.page}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  const updateCurrentIndex = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.floor(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onScroll={handleScroll}
        onMomentumScrollEnd={updateCurrentIndex}
      />
      <View style={styles.pagination}>
        {onboardingData.map((_, index) => {
          const opacity = scrollX.interpolate({
            inputRange: [
              width * (index - 1),
              width * index,
              width * (index + 1),
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={index}
              style={[styles.dot, { opacity }]}
            />
          );
        })}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>
            {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
  },
  page: {
    width,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: '#707070',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 30,
    width: 350
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 150,
    alignSelf: 'center',
  },
  dot: {
    height: 8,
    width: 20,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginHorizontal: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 40,
    width: '100%',
  },
  skip: {
    fontSize: 16,
    color: '#555',
  },
  nextButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  nextText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default Onboarding;
