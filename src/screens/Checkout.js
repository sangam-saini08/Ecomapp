import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';
import uuid from 'react-native-uuid';

const Checkout = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const isFocused = useIsFocused();
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
          snapshot.docs.map(itme => {
            if (itme._data.default == true) {
              setSelectedAddress(
                '' +
                  itme._data.street +
                  ',' +
                  itme._data.city +
                  ',' +
                  itme._data.state +
                  ',' +
                  itme._data.pincode,
              );
            }
          });
        }
      });
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
              source={require('../image/icons/favrate.png')}
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

  const createOrder = async paymentID => {
    let userID = await AsyncStorage.getItem('USERID');
    let temp = products;
    temp.map(item => {
      const orderId = uuid.v4();
      firestore()
        .collection('orders')
        .doc(orderId)
        .set({
          ...item._data,
          orderId: orderId,
          paymentID: paymentID,
          status: 'order-placed',
        })
        .then(
          firestore()
            .collection('cart')
            .where('addedBy', '==', userID)
            .get()
            .then(snapshot => {
              snapshot.docs.map(item => {
                firestore().collection('cart').doc(item._data.cartId).delete();
              });
            }),
        )
        .then(navigation.navigate('Success'));
    });
  };
  return (
    <View style={styles.container}>
      <View>
        <FlatList data={products} renderItem={renderItem} />
      </View>
      <View style={styles.totalView}>
        <Text style={styles.titleTxt}>{'item: ' + products.length}</Text>
        <Text style={styles.titleTxt}>{'total: ' + getTotal()}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.totalView}>
        <Text style={styles.titleTxt}>deilvery address</Text>
        <Text
          style={[
            styles.titleTxt,
            {textDecorationLine: 'underline', color: 'blue'},
          ]}
          onPress={() => {
            navigation.navigate('MyAddress');
          }}>
          edit address
        </Text>
      </View>
      <Text style={styles.selectedAddressTxt}>
        {selectedAddress == '' ? 'no address selected' : selectedAddress}
      </Text>
      <View style={styles.divider} />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_wD4PnqvFH9UASc', // Your api key
            amount: getTotal() * 100,
            name: 'Ecom App',
            prefill: {
              email: 'void@razorpay.com',
              contact: '9191919191',
              name: 'Razorpay Software',
            },
            theme: {color: 'blue'},
          };
          RazorpayCheckout.open(options)
            .then(data => {
              createOrder(data.razorpay_payment_id);
              // Alert.alert(`Success: ${data.razorpay_payment_id}`);
            })
            .catch(error => {
              // handle failure
              Alert.alert(`Error: ${error.code} | ${error.description}`);
            });
        }}>
        <Text style={styles.btnTxt}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  totalView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  titleTxt: {
    color: 'black',
    fontSize: 18,
    textTransform: 'capitalize',
  },
  divider: {
    width: '90%',
    height: 1,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginTop: 20,
  },
  selectedAddressTxt: {
    marginLeft: 20,
    marginTop: 20,
    width: 200,
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
    position: 'absolute',
    bottom: 60,
  },
  btnTxt: {
    color: 'rgba(0,0,0,.7)',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    letterSpacing: 1,
  },
});
