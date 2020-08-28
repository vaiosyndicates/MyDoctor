import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header, Chatitem, InputChat} from '../../component';
import {fonts, colors} from '../../utils';

const Chat = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header
        type="dark-profile"
        headerTitle="Dr Nia Irwan"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Text style={styles.date}>Senin, 21 Maret, 2020</Text>
        <Chatitem isSender={true} />
        <Chatitem />
        <Chatitem />
      </View>
      <InputChat />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  date: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    textAlign: 'center',
    marginVertical: 20,
  },
});
