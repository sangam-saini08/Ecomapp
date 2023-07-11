import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const User = () => {
  const [name, setName] = useState('');
  const [email, setEmal] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    let myName = await AsyncStorage.getItem('NAME');
    let myEmail = await AsyncStorage.getItem('EMAIL');
    setName(myName);
    setEmal(myEmail);
  };
  const logOut = async () => {
    let Id = await AsyncStorage.getItem('USERID');
    if (Id != '') {
      await AsyncStorage.removeItem('USERID');
      await AsyncStorage.removeItem('EMAIL');
      await AsyncStorage.removeItem('NAME');
    } else {
      Alert.alert('opps', 'login first to logout');
      console.log('else');
    }
    getUser();
    console.log('logout done');
  };
  return (
    <View style={styles.container}>
      <Image source={require('../../image/user.png')} style={styles.profile} />
      <Text style={styles.name}>{name == null ? 'User' : name}</Text>
      <Text style={styles.email}>{email == null ? 'Email' : email}</Text>
      <View style={styles.border} />

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate('Orders');
        }}>
        <Text style={styles.btnTxt}>Orders</Text>
        <Text style={styles.arrow}>{'>'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnTxt}>Address</Text>
        <Text style={styles.arrow}>{'>'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnTxt}>Notification</Text>
        <Text style={styles.arrow}>{'>'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('TermsAndCondition')}>
        <Text style={styles.btnTxt}>Terms & Condition</Text>
        <Text style={styles.arrow}>{'>'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('AboutUs')}>
        <Text style={styles.btnTxt}>About Us</Text>
        <Text style={styles.arrow}>{'>'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('ContactUs')}>
        <Text style={styles.btnTxt}>Contact Us</Text>
        <Text style={styles.arrow}>{'>'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          if (name == null) {
            navigation.navigate('Login');
          } else logOut();
        }}>
        <Text style={styles.btnTxt}>{name == null ? 'Log In' : 'Log Out'}</Text>
        <Text style={styles.arrow}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    borderRadius: 50,
    marginTop: 30,
  },
  name: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 20,
    marginTop: 15,
    fontWeight: '600',
    letterSpacing: 1,
  },
  email: {
    alignSelf: 'center',
    color: 'black',
  },
  border: {
    width: '90%',
    height: 1,
    backgroundColor: 'rgba(0,0,0,.15)',
    alignSelf: 'center',
    marginVertical: 30,
  },
  btn: {
    alignSelf: 'center',
    width: '90%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnTxt: {
    fontSize: 16,
    letterSpacing: 0.5,
    color: 'black',
  },
  arrow: {
    fontSize: 20,
  },
});
