import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {fonts, colors} from '../../../utils';
import IsReceiver from './IsReceiver';
import IsMe from './IsMe';

const ChatItem = ({isSender}) => {
  if (isSender) {
    return <IsMe />;
  }
  return <IsReceiver />;
};

export default ChatItem;
