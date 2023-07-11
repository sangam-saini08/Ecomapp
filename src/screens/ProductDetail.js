import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import LoginSignupDialogPage from '../commons/LoginSignupDialogPage';

const ProductDetail = ({route, navigation}) => {
  const [visible, setVisible] = useState(false);

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
              if (x._data.name === item.name) {
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
                    ...item,
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
                ...item,
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
          ...item,
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
  const {name, image, id, price, dec, Dprice} = route.params.productData;
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageView}>
        <Image style={styles.productImage} source={{uri: image}} />
        <TouchableOpacity
          style={styles.backbutton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backbuttontxt}> back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.favratebutton}
          onPress={() => checkLoginForFav(route.params.productData)}>
          <Image
            style={styles.favratebuttonimg}
            source={require('../image/icons/favrate.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.priceview}>
          <Text style={styles.dprice}>{`MRP: ₹${Dprice}`}</Text>
          <Text style={styles.price}>{price}</Text>
        </View>
        <TouchableOpacity
          style={styles.ATCbtn}
          onPress={() => {
            checkLoginForATC(route.params.productData);
          }}>
          <Text style={styles.ATCbtntxt}>add to cart</Text>
        </TouchableOpacity>
        <Text style={styles.subheading}>about the item</Text>
        <Text
          style={
            styles.dec
          }>{`${dec}. This is one of the simpler, no-frills text generators based only on Lorem Ipsum. You basically are only able to adjust the amount of paragraphs or words. You can also create bulleted lists or generate your text based on how many bytes it should be.`}</Text>
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
    </ScrollView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: '100%',
  },
  imageView: {
    width: '100%',
    // height: '50%',
    backgroundColor: 'red',
  },
  productImage: {
    height: 360,
    width: 360,
  },
  backbutton: {
    width: 60,
    height: 30,
    backgroundColor: 'white',
    position: 'absolute',
    left: 20,
    top: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopEndRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 2,
    borderBottomRightRadius: 2,
    elevation: 10,
  },
  backbuttontxt: {
    color: 'black',
    textTransform: 'capitalize',
  },
  favratebutton: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    position: 'absolute',
    right: 20,
    top: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    borderRadius: 25,
    paddingTop: 3,
  },
  favratebuttonimg: {
    width: 30,
    height: 30,
  },
  bottomView: {
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  name: {
    color: 'black',
    textTransform: 'capitalize',
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  priceview: {
    flexDirection: 'row',
    width: '52%',
    height: 30,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingLeft: 5,
  },
  dprice: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  price: {
    color: 'grey',
    textDecorationLine: 'line-through',
  },
  ATCbtn: {
    backgroundColor: '#FFBE0B',
    width: '90%',
    height: 50,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  ATCbtntxt: {
    color: 'rgba(0,0,0,.7)',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    letterSpacing: 1,
  },
  subheading: {
    color: 'black',
    textTransform: 'capitalize',
    marginTop: 20,
    fontWeight: 'bold',
    borderColor: 'rgba(0,0,0,.1)',
    borderBottomWidth: 1,
  },
  dec: {
    color: 'black',
    fontWeight: '100',
    marginTop: 10,
  },
});
