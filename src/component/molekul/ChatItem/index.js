import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {fonts, colors} from '../../../utils';
import IsReceiver from './IsReceiver';
import IsMe from './IsMe';

const ChatItem = ({isSender, text, date, photo, id}) => {
  if (isSender) {
    return <IsMe text={text} date={date} id={id} />;
  }
  return <IsReceiver text={text} date={date} photo={photo} id={id} />;
};

export default ChatItem;
