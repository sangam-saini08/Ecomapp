import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';

const ContactUs = () => {
  return (
    <View style={{flex: 1}}>
      <ScrollView style={{padding: 20}}>
        <Text style={styles.Text}>
          We value your feedback, questions, and concerns. Our customer support
          team is here to assist you and provide the help you need. There are
          several ways you can reach out to us:
        </Text>
        <Text style={[styles.Text, styles.heading]}>1. Email Support:</Text>
        <Text style={styles.Text}>
          You can email us at support@ecommapp.com for any inquiries or
          assistance. Our team will respond to your email as quickly as
          possible, usually within 24 hours.
        </Text>
        <Text> </Text>
        <Text style={[styles.Text, styles.heading]}>2. Live Chat:</Text>
        <Text style={styles.Text}>
          For real-time assistance, we offer a live chat feature on our app.
          Simply visit the "Contact Us" section and initiate a chat with one of
          our support representatives. They will be happy to help you with any
          issues or answer your questions immediately.
        </Text>
        <Text> </Text>
        <Text style={[styles.Text, styles.heading]}>3. Social Media:</Text>
        <Text style={styles.Text}>
          Connect with us on social media platforms such as Facebook, Twitter,
          and Instagram. Follow our official accounts to stay updated on the
          latest news, promotions, and announcements. You can also send us
          direct messages or leave comments, and our team will respond to you
          promptly.
        </Text>
        <Text> </Text>
        <Text style={[styles.Text, styles.heading]}>
          4. FAQ and Help Center:
        </Text>
        <Text style={styles.Text}>
          Before reaching out to our support team, you may find the answers to
          many common questions in our comprehensive FAQ section or Help Center.
          We have compiled a list of frequently asked questions and provided
          detailed guides to assist you with various aspects of our app.
        </Text>
        <Text> </Text>
        <Text style={[styles.Text, styles.heading]}>
          5. Feedback and Suggestions:
        </Text>
        <Text style={styles.Text}>
          We value your input and strive to improve our app based on your
          feedback. If you have any suggestions, ideas, or general feedback,
          please feel free to share them with us. We appreciate hearing from our
          users and continuously work towards enhancing your shopping
          experience.
        </Text>
        <Text> </Text>
        <Text style={styles.Text}>
          Your satisfaction is our priority, and we are committed to providing
          excellent customer service. Don't hesitate to reach out to us whenever
          you need assistance. We are here to ensure that your experience with
          Ecomm App is nothing short of exceptional.
        </Text>

        <Text style={[styles.Text, styles.heading, {marginBottom: 0}]}>
          Thank you for choosing Ecomm App!
        </Text>
        <Text style={[styles.Text, styles.heading, {marginBottom: 50}]}>
          The Ecomm App Team
        </Text>
      </ScrollView>
    </View>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  Text: {
    color: 'black',
    fontSize: 16,
    textAlign: 'justify',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 1,
    marginTop: 20,
    letterSpacing: 1,
    textAlign: 'left',
  },
});
