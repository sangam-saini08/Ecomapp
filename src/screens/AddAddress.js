import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddAddress = ({navigation}) => {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  const saveAddress = async () => {
    const id = await AsyncStorage.getItem('USERID');
    const addressID = uuid.v4();
    firestore()
      .collection('address')
      .doc(addressID)
      .set({
        addedBy: id,
        street: street,
        city: city,
        state: state,
        pincode: pincode,
        addressID: addressID,
        default: false,
      })
      .then(res => {
        navigation.goBack();
      })
      .catch(err => console.log(err));
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Street Address"
        style={styles.input}
        value={street}
        onChangeText={txt => setStreet(txt)}
      />
      <TextInput
        placeholder="Enter City"
        style={styles.input}
        value={city}
        onChangeText={txt => setCity(txt)}
      />
      <TextInput
        placeholder="Enter State "
        style={styles.input}
        value={state}
        onChangeText={txt => setState(txt)}
      />
      <TextInput
        placeholder="Enter Pincode "
        style={styles.input}
        value={pincode}
        keyboardType="number-pad"
        onChangeText={txt => setPincode(txt)}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          saveAddress();
        }}>
        <Text style={styles.btnTxt}>save address</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    width: '90%',
    height: 55,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 30,
    alignSelf: 'center',
    color: 'black',
    borderColor: 'black',
  },
  btn: {
    backgroundColor: 'purple',
    width: '90%',
    height: 55,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: 'white',
    fontSize: 16,
    textTransform: 'capitalize',
    letterSpacing: 0.5,
  },
});
