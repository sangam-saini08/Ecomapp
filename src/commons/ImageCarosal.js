import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
const {height, width} = Dimensions.get('window');

const ImageCarosal = () => {
  const [images, setImages] = useState([
    {image: require('../image/carosal/carosal1.png'), id: 1},
    {image: require('../image/carosal/carosal2.png'), id: 2},
    {image: require('../image/carosal/carosal3.png'), id: 3},
    {image: require('../image/carosal/carosal4.png'), id: 4},
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const render = ({item, index, key}) => {
    return (
      <View style={styles.renderView}>
        <TouchableOpacity style={styles.carosal}>
          <Image source={item.image} style={styles.carosalImage} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View>
        <FlatList
          keyExtractor={item => item.id}
          data={images}
          renderItem={render}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x;
            setCurrentIndex((x / width).toFixed(0));
          }}
        />
      </View>
      <View style={styles.dotView}>
        {images.map((item, index) => {
          return (
            <View
              key={item.id}
              style={{
                width: currentIndex == index ? 20 : 8,
                height: 8,
                borderRadius: 50,
                backgroundColor: currentIndex == index ? 'grey' : 'green',
                marginHorizontal: 3,
                // marginTop: 5,
              }}></View>
          );
        })}
      </View>
    </View>
  );
};

export default ImageCarosal;

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  dotView: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  renderView: {
    backgroundColor: 'white',
    height: height / 3,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carosal: {
    width: '90%',
    height: '84%',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  carosalImage: {
    width: '100%',
    height: '100%',
    objectFit: 'fill',
    borderRadius: 25,
  },
});
