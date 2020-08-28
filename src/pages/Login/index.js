/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ILLogo} from '../../assets';
import {Input, Button, Link} from '../../component';
import {colors, fonts} from '../../utils';

const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View>
        <ILLogo />
        <Text style={styles.text}>Masuk dan mulai berkonsultasi</Text>
      </View>
      <View>
        <Input label="Email Address" />
      </View>
      <View style={{height: 24}} />
      <View>
        <Input label="Password" />
      </View>
      <View style={{height: 10}} />
      <Link title="Forgot My Password" size={12} align="left" />
      <View style={{height: 40}} />
      <Button title="Sign In" onPress={() => navigation.replace('MainApp')} />
      <View style={{height: 30}} />
      <Link
        title="Create New Account"
        size={16}
        align="center"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    padding: 40,
  },
  text: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 40,
    marginBottom: 40,
    maxWidth: 153,
  },
  form: {
    marginBottom: 24,
  },
});
