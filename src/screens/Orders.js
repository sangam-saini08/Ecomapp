import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Orders = () => {
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    getOrderList();
  }, []);
  const getOrderList = async () => {
    let userId = await AsyncStorage.getItem('USERID');
    firestore()
      .collection('orders')
      .where('addedBy', '==', userId)
      .get()
      .then(snapshot => {
        setOrderList(snapshot.docs);
      });
  };
  const renderView = ({item}) => {
    return (
      <View style={styles.products}>
        <View
          style={{
            width: '30%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 5,
          }}>
          <Image style={styles.productImage} source={{uri: item._data.image}} />
        </View>
        <View style={styles.productMidView}>
          <Text style={styles.nameTxt}>{item._data.name}</Text>
          <Text style={styles.decTxt}>{item._data.dec}</Text>
          <View style={styles.priceView}>
            <Text style={styles.Dprice}>{'Rs. ₹' + item._data.Dprice}</Text>
            <Text style={styles.price}>{item._data.price}</Text>
          </View>
        </View>
        <View style={styles.productLeftView}>
          <Text style={[styles.status]}>Status</Text>
          <Text
            style={[
              styles.status,
              {color: item._data.status == 'cancel' ? 'red' : 'green'},
            ]}>
            {item._data.status}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text
        style={{
          alignSelf: 'center',
          marginTop: 10,
          fontSize: 20,
          textTransform: 'capitalize',
          color: 'black',
          letterSpacing: 1,
          fontWeight: '700',
        }}>
        my Orders
      </Text>
      <FlatList data={orderList} renderItem={renderView} />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  products: {
    backgroundColor: 'white',
    width: '90%',
    height: 110,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 20,
    elevation: 10,
    borderRadius: 10,
  },
  productImage: {
    height: 100,
    width: 100,
    borderRadius: 20,
  },
  productMidView: {
    width: '40%',
    height: '100%',
    // justifyContent: 'center',
    paddingLeft: 4,
    marginLeft: 10,
    flexDirection: 'column',
    marginVertical: 5,
  },
  nameTxt: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    // marginTop: 10,
  },
  decTxt: {
    color: 'black',
    fontSize: 13,
  },
  priceView: {
    flexDirection: 'row',
    // justifyContent: 'center',
    marginTop: 10,
  },
  Dprice: {
    color: 'green',
    fontSize: 15,
  },
  price: {
    color: 'grey',
    marginLeft: 5,
    textDecorationLine: 'line-through',
  },
  productLeftView: {
    flexDirection: 'column',
    height: '100%',
    width: '27%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  status: {
    fontSize: 11,
    textTransform: 'capitalize',
  },
});
