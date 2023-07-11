import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import Home from './tabs/Home';
import Search from './tabs/Search';
import Cart from './tabs/Cart';
import Favrate from './tabs/Favrate';
import User from './tabs/User';

const MainScreen = () => {
  const [activeTab, setActiveTab] = useState('home');
  const color1 = 'grey';
  const color2 = 'black';
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <View style={{flex: 1}}>
        {activeTab === 'home' ? (
          <Home />
        ) : activeTab === 'search' ? (
          <Search />
        ) : activeTab === 'cart' ? (
          <Cart />
        ) : activeTab === 'favrate' ? (
          <Favrate />
        ) : (
          <User />
        )}
      </View>
      <View style={styles.bottomNavbar}>
        <TouchableOpacity
          onPress={() => {
            setActiveTab('home');
          }}>
          <Image
            source={require('../image/icons/home.png')}
            style={[
              styles.bottomNavbarIcons,
              {
                tintColor: activeTab === 'home' ? color2 : color1,
                width: 28,
                height: 28,
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActiveTab('search');
          }}>
          <Image
            source={require('../image/icons/search.png')}
            style={[
              styles.bottomNavbarIcons,
              {tintColor: activeTab === 'search' ? color2 : color1},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActiveTab('cart');
          }}>
          <Image
            source={require('../image/icons/cart.png')}
            style={[
              styles.bottomNavbarIcons,
              {tintColor: activeTab === 'cart' ? color2 : color1},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActiveTab('favrate');
          }}>
          <Image
            source={require('../image/icons/heart.png')}
            style={[
              styles.bottomNavbarIcons,
              {tintColor: activeTab === 'favrate' ? color2 : color1},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActiveTab('user');
          }}>
          <Image
            source={require('../image/icons/user.png')}
            style={[
              styles.bottomNavbarIcons,
              {
                tintColor: activeTab === 'user' ? color2 : color1,
                width: 29,
                height: 29,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  bottomNavbar: {
    backgroundColor: 'white',
    height: '10%',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 10,
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  bottomNavbarIcons: {
    width: 30,
    height: 30,
  },
});
