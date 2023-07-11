import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const Favrate = () => {
  const [favList, setFavList] = useState([]);
  useEffect(() => {
    getFavData();
  }, []);
  const getFavData = async () => {
    let userID = await AsyncStorage.getItem('USERID');
    if (userID != null) {
      firestore()
        .collection('favrate')
        .get()
        .then(snapshot => {
          setFavList(snapshot.docs);
        });
    }
  };
  const checkLoginForATC = async item => {
    let userID = await AsyncStorage.getItem('USERID');
    const cartId = await uuid.v4();
    if (userID != null) {
      firestore()
        .collection('cart')
        .where('addedBy', '==', userID)
        .get()
        .then(snapshot => {
          if (snapshot.docs.length > 0) {
            snapshot.docs.map(x => {
              if (x._data.name === item._data.name) {
                firestore()
                  .collection('cart')
                  .doc(x._data.cartId)
                  .update({qty: x._data.qty + 1})
                  .then(res => {})
                  .catch(err => console.log(err));
              } else {
                firestore()
                  .collection('cart')
                  .doc(cartId)
                  .set({
                    ...item._data,
                    cartId: cartId,
                    addedBy: userID,
                    qty: 1,
                  })
                  .then(res => {
                    console.log('mid');
                  })
                  .catch(e => {
                    console.log(e);
                  });
              }
            });
          } else {
            firestore()
              .collection('cart')
              .doc(cartId)
              .set({
                ...item._data,
                cartId: cartId,
                addedBy: userID,
                qty: 1,
              })
              .then(res => {
                console.log('bottom');
              });
          }
        });
    } else {
      setVisible(true);
    }
  };
  const deleteFav = async id => {
    firestore().collection('favrate').doc(id).delete();
    getFavData();
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
            <Text style={styles.price}>{item._data.price}</Text>
          </View>
        </View>
        <View style={styles.productLeftView}>
          <TouchableOpacity
            onPress={() => {
              deleteFav(item._data.favid);
            }}>
            <Image
              source={require('../../image/icons/delete.png')}
              style={styles.favIcon}
            />
          </TouchableOpacity>
          <Text
            onPress={() => {
              checkLoginForATC(item);
            }}
            style={styles.ATCbtn}>
            add to cart
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ecom Applicaiton</Text>
      </View>
      <Text
        style={{
          marginLeft: 20,
          marginTop: 30,
          fontSize: 16,
          // borderBottomWidth: 0.2,
          borderColor: 'black',
          color: 'black',
          width: 100,
        }}>
        Favrate List
      </Text>
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: 'rgba(0,0,0,.2)',
          marginTop: 20,
          width: '90%',
          alignSelf: 'center',
        }}
      />
      {favList.length > 0 ? (
        <View>
          <FlatList data={favList} renderItem={renderItem} />
        </View>
      ) : (
        <View style={{width: '100%', height: '100%'}}>
          <Text style={{alignSelf: 'center', color: 'black', marginTop: 200}}>
            No Product found
          </Text>
        </View>
      )}
    </View>
  );
};

export default Favrate;

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
  favIcon: {
    height: 40,
    width: 40,
  },
  ATCbtn: {
    color: 'black',
    textTransform: 'capitalize',
    fontSize: 11,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 0.5,
    width: 70,
    padding: 5,
  },
});
