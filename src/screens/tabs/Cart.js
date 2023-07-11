import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Cart = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let userID = await AsyncStorage.getItem('USERID');
    firestore()
      .collection('cart')
      .where('addedBy', '==', userID)
      .get()
      .then(snapshot => {
        if (snapshot.docs != []) {
          setProducts(snapshot.docs);
        }
      });
  };
  const decreaseQTY = item => {
    if (item._data.qty > 1) {
      firestore()
        .collection('cart')
        .doc(item._data.cartId)
        .update({qty: item._data.qty - 1})
        .then(res => {})
        .catch(err => console.log(err));
      getData();
    } else {
      firestore().collection('cart').doc(item._data.cartId).delete();
      getData();
    }
  };
  const increaseQTY = item => {
    firestore()
      .collection('cart')
      .doc(item._data.cartId)
      .update({qty: item._data.qty + 1})
      .then(res => {})
      .catch(err => console.log(err));
    getData();
  };

  const getTotal = () => {
    let temp = products;
    let total = 0;
    temp.map(item => {
      total = total + parseInt(item._data.Dprice * item._data.qty);
    });
    return total;
  };
  const renderItem = ({item, index}) => {
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
          </View>
        </View>
        <View style={styles.productLeftView}>
          <TouchableOpacity
            onPress={() => {
              // checkLoginForFav();
              console.log(products);
            }}>
            <Image
              source={require('../../image/icons/favrate.png')}
              style={styles.favIcon}
            />
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={styles.ATCbtn}
              onPress={() => {
                decreaseQTY(item);
              }}>
              -
            </Text>
            <Text style={styles.ATCbtn}>{item._data.qty}</Text>
            <Text
              style={styles.ATCbtn}
              onPress={() => {
                increaseQTY(item);
              }}>
              +
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ecom Applicaiton</Text>
      </View>
      {products.length > 0 ? (
        <View>
          <FlatList data={products} renderItem={renderItem} />
        </View>
      ) : (
        <View
          style={{
            height: '85%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'black', fontSize: 20}}>Cart is Empty</Text>
        </View>
      )}

      {products.length > 0 && (
        <View style={styles.checkoutView}>
          <Text style={styles.total}>{'total: ' + getTotal()}</Text>
          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => {
              navigation.navigate('Checkout');
            }}>
            <Text style={styles.checkoutBtnTxt}>checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: '9%',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingLeft: 30,
    elevation: 10,
  },
  title: {
    color: 'purple',
    fontSize: 25,
    fontWeight: 'bold',
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
    width: '36%',
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
  favIcon: {
    height: 30,
    width: 30,
  },
  ATCbtn: {
    color: 'black',
    textTransform: 'capitalize',
    fontSize: 11,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 0.5,
    width: 30,
    textAlign: 'center',
    padding: 2,
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 1,
  },
  checkoutView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    height: 100,
    width: '100%',
    position: 'absolute',
    bottom: 85,
    backgroundColor: '#3a86ff',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  total: {
    color: 'white',
    fontSize: 18,
    textTransform: 'capitalize',
    letterSpacing: 2,
  },
  checkoutBtn: {
    backgroundColor: 'white',
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  checkoutBtnTxt: {
    color: 'black',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
