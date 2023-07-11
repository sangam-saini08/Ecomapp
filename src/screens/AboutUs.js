import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';

const AboutUs = () => {
  return (
    <View style={{flex: 1}}>
      <ScrollView style={{padding: 20}}>
        <Text style={[styles.Text, styles.heading, {marginTop: 1}]}>
          Welcome to Ecomm App!
        </Text>
        <Text style={styles.Text}>
          At Ecomm App, we strive to provide you with a seamless and enjoyable
          online shopping experience. Our goal is to become your go-to
          destination for all your shopping needs, offering a wide range of
          products from various categories, all in one convenient app.
        </Text>
        <Text> </Text>

        <Text style={styles.Text}>
          Our mission is to simplify the way you shop, making it easier and more
          efficient for you to discover and purchase the items you love. Whether
          you're searching for the latest fashion trends, home essentials,
          electronics, beauty products, or anything in between, Ecomm App has
          got you covered.
        </Text>
        <Text style={[styles.Text, styles.heading]}>Why choose Ecomm App?</Text>
        <Text style={styles.Text}>
          1. Extensive Product Selection: We understand that every customer is
          unique with different preferences and requirements. That's why we
          curate an extensive range of products, ensuring there's something for
          everyone. With just a few taps, you can explore an array of options
          and find exactly what you're looking for.
        </Text>
        <Text> </Text>

        <Text style={styles.Text}>
          2. User-Friendly Interface: We believe that shopping should be a
          hassle-free and enjoyable experience. Our app is designed with a clean
          and intuitive interface, making it easy for you to navigate and find
          what you need. From browsing through categories to placing orders,
          we've made sure that every step is smooth and effortless.
        </Text>
        <Text> </Text>

        <Text style={styles.Text}>
          3. Secure and Reliable: Your privacy and security are of utmost
          importance to us. We take extensive measures to protect your personal
          information and ensure secure transactions. You can shop with
          confidence, knowing that your data is safeguarded and your payments
          are processed securely.
        </Text>
        <Text> </Text>

        <Text style={styles.Text}>
          4. Fast and Reliable Delivery: We understand that prompt delivery is
          crucial when it comes to online shopping. That's why we have
          established partnerships with reputable logistics providers to ensure
          that your orders reach you quickly and efficiently. Sit back and relax
          as we handle the logistics, delivering your purchases right to your
          doorstep.
        </Text>
        <Text> </Text>

        <Text style={styles.Text}>
          5. Excellent Customer Service: At Ecomm App, we prioritize your
          satisfaction. Our dedicated customer support team is always ready to
          assist you with any queries, concerns, or feedback you may have. We
          are committed to providing top-notch service and ensuring that you
          have a pleasant shopping experience with us.
        </Text>
        <Text style={styles.Text}>
          Join the Ecomm App community today and discover a world of
          convenience, quality, and affordability. We can't wait to serve you
          and be a part of your shopping journey!
        </Text>
        <Text style={[styles.Text, styles.heading, {marginBottom: 0}]}>
          Happy Shopping,
        </Text>
        <Text style={[styles.Text, styles.heading, {marginBottom: 50}]}>
          The Ecomm App Team
        </Text>
      </ScrollView>
    </View>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  Text: {
    color: 'black',
    fontSize: 16,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    letterSpacing: 1,
  },
});
