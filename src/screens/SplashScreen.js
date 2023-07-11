import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('MainScreen');
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.logoTxt}>Ecom App</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
  },
  logoTxt: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
});
