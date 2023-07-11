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
import uuid from 'react-native-uuid';

const Signup = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const id = uuid.v4();
  const createUser = () => {
    try {
      if (name == '' || email == '' || password == '') {
        Alert.alert('please enter the values');
      } else {
        firestore()
          .collection('users')
          .doc(id)
          .set({
            name: name,
            email: email,
            password: password,
            id: id,
          })
          .then(res => {
            navigation.goBack();
            console.log('register successful');
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.titleText}>register</Text>
        <Image
          source={require('../../image/signup2.png')}
          style={styles.loginImg}
        />
        <View style={styles.bottomView}>
          <Text
            style={[styles.titleText, {color: '#3a86ff', fontWeight: 'bold'}]}>
            signup
          </Text>
          <View style={styles.inputView}>
            <Text style={styles.inputTxt}>full name</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={'black'}
              value={name}
              onChangeText={txt => setName(txt)}
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.inputTxt}>email address</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={'black'}
              value={email}
              onChangeText={txt => setEmail(txt)}
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.inputTxt}>password</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={'black'}
              value={password}
              onChangeText={txt => setPassword(txt)}
            />
          </View>
          <TouchableOpacity style={styles.btn} onPress={() => createUser()}>
            <Text style={styles.btnTxt}>register</Text>
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
            <Text style={styles.bottomText}>Already have an account?</Text>
            <Text
              style={[styles.bottomText, {marginLeft: 5, color: 'blue'}]}
              onPress={() => navigation.goBack()}>
              Login
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

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
    textTransform: 'uppercase',
    letterSpacing: 4,
  },
  loginImg: {
    height: 240,
    width: '70%',
    alignSelf: 'center',
  },
  bottomView: {
    backgroundColor: 'white',
    width: '100%',
    height: '66%',
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
