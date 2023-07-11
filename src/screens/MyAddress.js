import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

const MyAddress = ({navigation}) => {
  const [addressList, setAddressList] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    getAddress();
  }, [isFocused]);
  const getAddress = async () => {
    const id = await AsyncStorage.getItem('USERID');
    firestore()
      .collection('address')
      .where('addedBy', '==', id)
      .get()
      .then(snapshot => {
        if (snapshot.docs != []) {
          setAddressList(snapshot.docs);
        }
      });
  };

  const setDefault = addressID => {
    let temp = addressList;
    temp.map(item => {
      if (item._data.addressID == addressID) {
        firestore()
          .collection('address')
          .doc(addressID)
          .update({default: true});
      } else {
        firestore()
          .collection('address')
          .doc(item._data.addressID)
          .update({default: false});
      }
    });
    getAddress();
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemView}
        onPress={() => {
          setDefault(item._data.addressID);
          navigation.goBack();
        }}>
        <View style={styles.itemLeftView}>
          <Text style={styles.itemValue}>{item._data.street + ','}</Text>
          <Text style={styles.itemValue}>{item._data.city + ','}</Text>
          <Text style={styles.itemValue}>{item._data.state + ','}</Text>
          <Text style={styles.itemValue}>{item._data.pincode + ','}</Text>
        </View>
        <View style={styles.itemRightView}>
          <Text style={styles.edit}>edit</Text>
          <Text style={styles.delete}>delete</Text>
        </View>
        {item._data.default == true && (
          <Text style={styles.default}>default</Text>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList renderItem={renderItem} data={addressList} />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate('AddAddress');
        }}>
        <Text style={styles.btnTxt}>add new address</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    backgroundColor: 'purple',
    width: '90%',
    height: 55,
    alignSelf: 'center',
    borderRadius: 10,
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: 'white',
    fontSize: 16,
    textTransform: 'capitalize',
    letterSpacing: 0.5,
  },
  itemView: {
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 20,
  },
  itemLeftView: {},
  itemRightView: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  default: {
    backgroundColor: 'purple',
    color: 'white',
    paddingHorizontal: 2,
    paddingVertical: 1,
    // borderRadius: 5,
    height: 17,
    position: 'absolute',
    right: 0,
    fontSize: 10,
    textAlign: 'center',
  },
  edit: {
    color: 'purple',
    padding: 5,
    borderColor: 'purple',
    borderWidth: 0.5,
    margin: 5,
    width: 70,
    textAlign: 'center',
    borderRadius: 5,
    textTransform: 'capitalize',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  delete: {
    color: 'red',
    padding: 5,
    borderColor: 'red',
    borderWidth: 0.5,
    width: 70,
    textAlign: 'center',
    borderRadius: 5,
    textTransform: 'capitalize',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  itemValue: {
    color: 'black',
    fontSize: 16,
    fontWeight: '700',
  },
});
