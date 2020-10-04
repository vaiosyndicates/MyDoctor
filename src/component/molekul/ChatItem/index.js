import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {fonts, colors} from '../../../utils';
import IsReceiver from './IsReceiver';
import IsMe from './IsMe';

const ChatItem = ({isSender, text, date, photo}) => {
  if (isSender) {
    return <IsMe text={text} date={date} />;
  }
  return <IsReceiver text={text} date={date} photo={photo} />;
};

export default ChatItem;
