import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';

const TermsAndCondition = () => {
  return (
    <View style={{flex: 1}}>
      <ScrollView style={{padding: 20}}>
        <Text style={styles.Text}>
          Please read these Terms and Conditions carefully before using the
          Ecomm App. These terms govern your access to and use of our mobile
          application and services. By accessing or using the Ecomm App, you
          agree to be bound by these Terms and Conditions. If you do not agree
          with any part of these terms, please refrain from using our app.
        </Text>
        <Text style={[styles.Text, styles.heading]}>
          1. Account Registration:
        </Text>
        <Text style={styles.Text}>
          a. In order to use certain features of the Ecomm App, you may be
          required to create an account. You are responsible for providing
          accurate and up-to-date information during the registration process.
          b. You must be at least 18 years old or have the legal capacity to
          enter into a binding agreement in your jurisdiction to create an
          account.
        </Text>
        <Text> </Text>
        <Text style={[styles.Text, styles.heading]}>
          2. User Responsibilities:
        </Text>
        <Text style={styles.Text}>
          a. You agree to use the Ecomm App solely for personal, non-commercial
          purposes. b. You are responsible for maintaining the confidentiality
          of your account information and for all activities that occur under
          your account. c. You must not engage in any activity that may disrupt
          or interfere with the functioning of the app or compromise its
          security.
        </Text>
        <Text> </Text>
        <Text style={[styles.Text, styles.heading]}>
          3. Product Listings and Orders:
        </Text>
        <Text style={styles.Text}>
          a. The Ecomm App provides product listings from various sellers. We
          strive to ensure the accuracy and completeness of product information;
          however, we do not guarantee the availability, quality, or suitability
          of the products listed. b. Placing an order through the Ecomm App
          constitutes an offer to purchase the selected products. We reserve the
          right to accept or reject any order at our discretion. c. Prices,
          discounts, and promotions are subject to change without notice. We are
          not responsible for any pricing errors or inaccuracies.
        </Text>
        <Text> </Text>
        <Text style={[styles.Text, styles.heading]}>
          4. Intellectual Property:
        </Text>
        <Text style={styles.Text}>
          a. The Ecomm App and its content, including but not limited to text,
          graphics, logos, images, and software, are protected by intellectual
          property rights owned by Ecomm App or its licensors. b. You may not
          reproduce, distribute, modify, or create derivative works of any
          content from the app without prior written permission.
        </Text>
        <Text> </Text>
        <Text style={[styles.Text, styles.heading]}>5. Privacy:</Text>
        <Text style={styles.Text}>
          a. We collect and process personal information in accordance with our
          Privacy Policy. By using the Ecomm App, you consent to the collection,
          use, and disclosure of your personal information as described in the
          Privacy Policy.
        </Text>
        <Text style={[styles.Text, styles.heading]}>
          6. Limitation of Liability:
        </Text>
        <Text style={styles.Text}>
          a. The Ecomm App and its services are provided on an "as is" and "as
          available" basis. We do not guarantee that the app will be error-free,
          uninterrupted, or free from viruses or other harmful components. b. To
          the fullest extent permitted by law, we disclaim all warranties,
          whether express or implied, including but not limited to warranties of
          merchantability, fitness for a particular purpose, and
          non-infringement. c. In no event shall Ecomm App or its affiliates be
          liable for any direct, indirect, incidental, special, or consequential
          damages arising out of or in connection with your use of the app.
        </Text>
        <Text style={[styles.Text, styles.heading]}>
          7. Modification of Terms:
        </Text>
        <Text style={styles.Text}>
          a. We reserve the right to modify these Terms and Conditions at any
          time. Any changes will be effective immediately upon posting on the
          Ecomm App. Your continued use of the app after the modifications
          constitutes your acceptance of the revised terms.
        </Text>
        <Text> </Text>
        <Text style={styles.Text}>
          Please review our complete Terms and Conditions for more detailed
          information regarding your rights and obligations when using the Ecomm
          App.
        </Text>
        <Text style={styles.Text}>
          If you have any questions or concerns about these Terms and
          Conditions, please contact our customer support.
        </Text>

        <Text style={[styles.Text, styles.heading, {marginBottom: 50}]}>
          Last updated: [7-july-2023]
        </Text>
      </ScrollView>
    </View>
  );
};

export default TermsAndCondition;

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
