import {Modal, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const LoginSignupDialogPage = ({visible, onClickCancel, onClickLogin}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modelView}>
        <View style={styles.modelViewBox}>
          <Text style={styles.titletxt}>please login first</Text>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => onClickLogin()}>
            <Text
              style={{color: 'white', fontSize: 20}}
              onPress={() => onClickLogin()}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => onClickCancel()}>
            <Text style={{color: 'white', fontSize: 20}}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LoginSignupDialogPage;

const styles = StyleSheet.create({
  modelView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modelViewBox: {
    backgroundColor: 'white',
    width: '80%',
    height: 200,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titletxt: {
    fontSize: 20,
    color: 'grey',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 20,
    textTransform: 'capitalize',
    marginTop: 20,
  },
  loginBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 30,
    marginVertical: 20,
    width: 200,
    height: 40,
  },
  cancelBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 30,
    marginBottom: 20,
    width: 200,
    height: 40,
  },
});
