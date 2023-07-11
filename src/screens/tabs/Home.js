import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import {useNavigation} from '@react-navigation/native';
import LoginSignupDialogPage from '../../commons/LoginSignupDialogPage';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    firestore()
      .collection('products')
      .get()
      .then(snapshot => {
        if (snapshot.docs != []) {
          setProducts(snapshot.docs);
        }
      });
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
  const checkLoginForFav = async item => {
    let id = await AsyncStorage.getItem('USERID');
    let favid = uuid.v4();
    if (id != null) {
      firestore()
        .collection('favrate')
        .doc(favid)
        .set({
          ...item._data,
          addedBy: id,
          favid: favid,
        })
        .then(res => {
          console.log('added fav');
        })
        .catch(err => console.log(err));
    } else {
      setVisible(true);
    }
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
              checkLoginForFav(item);
            }}>
            <Image
              source={require('../../image/icons/favrate.png')}
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
  const renderItem3 = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.renderMainView}
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('ProductDetail', {productData: item._data});
        }}>
        <View style={styles.renderImageView}>
          <Image source={{uri: item._data.image}} style={styles.itemImage} />
          <TouchableOpacity
            onPress={() => {
              checkLoginForFav(item);
            }}
            style={styles.itemFavButton}>
            <Image
              source={require('../../image/icons/favrate.png')}
              style={styles.itemFavButtonImg}
            />
          </TouchableOpacity>
          <View style={styles.bottomView}>
            <View style={styles.ratingView}>
              <Image
                source={require('../../image/icons/rating.png')}
                style={styles.ratingImg}
              />
              <Text style={styles.ratingTxt}>{'(46)'}</Text>
            </View>
            <View style={styles.brandView}>
              <Image
                source={require('../../image/yelp.png')}
                style={{width: 20, height: 20}}
              />
              <Text style={{color: 'grey', marginLeft: 5, letterSpacing: 1}}>
                Plesure
              </Text>
              <Image
                source={require('../../image/verified.png')}
                style={{width: 18, height: 18, marginLeft: 5}}
              />
            </View>
            <Text style={styles.itemName}>{item._data.name}</Text>
            <View style={styles.priceView}>
              <Text style={styles.itemPrice}>{item._data.price}</Text>
              <Text style={styles.itemDprice}>{`₹${item._data.Dprice}`}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ecom Applicaiton</Text>
      </View>
      <Text style={styles.subHeading}>Popular items</Text>
      <View style={{marginBottom: 180}}>
        <FlatList
          keyExtractor={item => item.id}
          data={products}
          renderItem={renderItem3}
          numColumns={2}
          contentContainerStyle={styles.flatliststyle}
        />
      </View>
      <LoginSignupDialogPage
        visible={visible}
        onClickCancel={() => {
          setVisible(false);
        }}
        onClickLogin={() => {
          navigation.navigate('Login');
          setVisible(false);
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  subHeading: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginLeft: 20,
    textTransform: 'capitalize',
    marginBottom: 5,
    marginTop: 10,
  },
  flatliststyle: {
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  renderMainView: {
    width: '47%',
    height: 350,
    alignSelf: 'center',
    marginVertical: 10,
    marginHorizontal: 5,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  renderImageView: {
    width: '100%',
    height: 200,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,.1)',
    borderRadius: 20,
  },
  itemImage: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
  },
  itemFavButton: {
    position: 'absolute',
    bottom: -12,
    right: -12,
    backgroundColor: 'white',
    height: 40,
    width: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemFavButtonImg: {
    width: 20,
    height: 20,
    tintColor: 'grey',
  },
  bottomView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  ratingView: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  ratingImg: {
    height: 20,
    width: 110,
  },
  ratingTxt: {
    color: 'grey',
  },
  brandView: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  itemName: {
    color: 'black',
    textTransform: 'capitalize',
    letterSpacing: 1,
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
  },
  priceView: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '66%',
  },
  itemPrice: {
    color: 'grey',
    textDecorationLine: 'line-through',
  },
  itemDprice: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
