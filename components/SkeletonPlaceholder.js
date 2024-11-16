import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonPlaceholder = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.container}>
        {[...Array(7)].map((_, index) => (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.circle} />
            <View style={styles.textBlock} />
          </View>
        ))}
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textBlock: {
    height: 20,
    flex: 1,
    marginLeft: 10,
    borderRadius: 4,
  },
});

export default SkeletonPlaceholder;
