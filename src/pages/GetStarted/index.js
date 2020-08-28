import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {ILLogo, ILBackground} from '../../assets';
import {Button} from '../../component';
import {colors, fonts} from '../../utils';

const getStarted = ({navigation}) => {
  return (
    <>
      <ImageBackground source={ILBackground} style={styles.page}>
        <View>
          <ILLogo />
          <Text style={styles.title}>
            Konsultasi dengan dokter jadi lebih mudah & fleksibel
          </Text>
        </View>
        <View>
          <Button
            title="Get Started"
            onPress={() => navigation.navigate('Register')}
          />
          <View style={styles.separator} />
          <Button
            type="sigin"
            title="Sign in"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </ImageBackground>
    </>
  );
};

export default getStarted;

const styles = StyleSheet.create({
  page: {
    padding: 40,
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    flex: 1,
  },
  title: {
    fontSize: 28,
    marginTop: 91,
    color: colors.white,
    fontFamily: fonts.primary[600],
  },
  separator: {
    height: 16,
  },
});
