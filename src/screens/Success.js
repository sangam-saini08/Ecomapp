import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const Success = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
      }}>
      <Image
        source={require('../image/check.png')}
        style={{width: 100, height: 100}}
      />
      <View style={{marginTop: 20, alignSelf: 'center'}}>
        <Text style={{fontSize: 16, color: 'black', alignSelf: 'center'}}>
          {' '}
          Your Order Placed{' '}
        </Text>
        <Text style={{fontSize: 16, color: 'green', alignSelf: 'center'}}>
          Successful..
        </Text>
      </View>
      <Text
        style={{
          color: 'black',
          borderWidth: 0.5,
          borderColor: 'black',
          padding: 10,
        }}
        onPress={() => {
          navigation.navigate('MainScreen');
        }}>
        GO to Home
      </Text>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({});
