import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [email, setEmal] = useState('');
  const [password, setPassword] = useState('');

  const saveloginState = async data => {
    await AsyncStorage.setItem('USERID', data.id);
    await AsyncStorage.setItem('EMAIL', data.email);
    await AsyncStorage.setItem('NAME', data.name);
    navigation.navigate('MainScreen');
  };

  const loginUser = () => {
    if (email != '' || password != '') {
      try {
        firestore()
          .collection('users')
          .where('email', '==', email)
          .get()
          .then(snapshot => {
            if (snapshot.docs[0] != undefined) {
              if (snapshot.docs[0]._data.password == password) {
                Alert.alert('User Login Successful..');
                console.log('login succes');
                saveloginState(snapshot.docs[0]._data);
              } else {
                Alert.alert('Invalid Credentials');
              }
            } else {
              Alert.alert('Invalid Credentials');
            }
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('fill the credentials proper;y');
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.titleText}>welcome</Text>
        <Image
          source={require('../../image/login.png')}
          style={styles.loginImg}
        />
        <View style={styles.bottomView}>
          <Text
            style={[styles.titleText, {color: '#3a86ff', fontWeight: 'bold'}]}>
            login
          </Text>
          <View style={styles.inputView}>
            <Text style={styles.inputTxt}>email address</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={'black'}
              onChangeText={txt => setEmal(txt)}
              value={email}
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.inputTxt}>password</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={'black'}
              onChangeText={txt => setPassword(txt)}
              value={password}
            />
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              loginUser();
            }}>
            <Text style={styles.btnTxt}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.orTxt}>OR</Text>
          <View style={styles.socialIcons}>
            <Image
              source={require('../../image/socialIcons/google.png')}
              style={styles.icons}
            />
            <Image
              source={require('../../image/socialIcons/facebook.png')}
              style={styles.icons}
            />
            <Image
              source={require('../../image/socialIcons/twitter.png')}
              style={styles.icons}
            />
          </View>
          <View style={styles.bottomTextView}>
            <Text style={styles.bottomText}>Do not have an account?</Text>
            <Text
              style={[
                styles.bottomText,
                {marginLeft: 5, color: 'blue', fontWeight: 'bold'},
              ]}
              onPress={() => navigation.navigate('Signup')}>
              Sign Up
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#3a86ff',
  },
  titleText: {
    color: 'white',
    fontSize: 25,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 4,
  },
  loginImg: {
    height: 220,
    width: '59%',
    alignSelf: 'center',
  },
  bottomView: {
    backgroundColor: 'white',
    width: '100%',
    height: '60%',
    alignSelf: 'center',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    position: 'absolute',
    bottom: 0,
    elevation: 10,
  },
  inputView: {
    width: '80%',
    height: 80,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignSelf: 'center',
    // marginTop: 5,
  },
  input: {
    width: '100%',
    height: 45,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,.08)',
    paddingLeft: 10,
    color: 'black',
  },
  inputTxt: {
    color: 'black',
    marginBottom: 5,
    marginLeft: 5,
    textTransform: 'capitalize',
    letterSpacing: 1,
  },
  btn: {
    backgroundColor: '#FFBE0B',
    width: '80%',
    height: 45,
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  btnTxt: {
    color: 'rgba(0,0,0,.7)',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    letterSpacing: 1,
  },
  orTxt: {
    textAlign: 'center',
    color: 'black',
    marginVertical: 10,
  },
  socialIcons: {
    width: '60%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,.02)',
    borderRadius: 20,
  },
  icons: {
    width: 40,
    height: 40,
  },
  bottomTextView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  bottomText: {
    color: 'rgba(0,0,0,.5)',
    // alignSelf: 'center',
    marginTop: 10,
  },
});
