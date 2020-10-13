import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Header, Chatitem, InputChat} from '../../component';
import {
  fonts,
  colors,
  getData,
  showError,
  chatTime,
  chatDate,
  uniqueId,
  createUUID,
} from '../../utils';
import {ILNullPhoto} from '../../assets';
import {Firebase} from '../../config';

const Chat = ({navigation, route}) => {
  const dataDoctor = route.params;
  const [chatContent, setChatContent] = useState('');
  const [userID, setUserID] = useState({});
  const [chats, setChats] = useState([]);
  const scrollViewRef = useRef();
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (mounted) {
      getProfileLocal();
      const chatIds = `${userID.uid}_${dataDoctor.data.uid}`;
      const urlChatting = `chatting/${chatIds}/allChat`;

      Firebase.database()
        .ref(urlChatting)
        .on('value', snapshot => {
          if (snapshot.val()) {
            const dataSnapshot = snapshot.val();
            const AllDataChat = [];

            Object.keys(dataSnapshot).map(item => {
              const dataChat = dataSnapshot[item];
              const newDataChat = [];

              Object.keys(dataChat).map(key => {
                newDataChat.push({
                  id: key,
                  data: dataChat[key],
                });
              });
              AllDataChat.push({
                date: item,
                data: newDataChat,
              });
            });
            setChats(AllDataChat);
            setMounted(false);
          }
        });
    }
    return () => {
      setMounted(false);
    };
  }, [dataDoctor.data.uid, mounted, userID.uid]);

  const getProfileLocal = () => {
    getData('user').then(res => {
      setUserID(res);
    });
  };

  const sendChat = () => {
    setMounted(true);
    const today = new Date();
    const chatIds = `${userID.uid}_${dataDoctor.data.uid}`;

    const urlChatting = `chatting/${chatIds}/allChat/${chatDate(today)}`;
    const urlMessagesUser = `messages/${userID.uid}/${chatIds}`;
    const urlMessagesDoctor = `messages/${dataDoctor.data.uid}/${chatIds}`;

    const data = {
      sendBy: userID.uid,
      chatDate: today.getTime(),
      chatTime: chatTime(today),
      chatContent: chatContent,
    };

    const dataHistoryChatUser = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: dataDoctor.data.uid,
    };

    const dataHistoryChatDoctor = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: userID.uid,
    };

    Firebase.database()
      .ref(urlChatting)
      .push(data)
      .then(res => {
        setChatContent('');
        Firebase.database()
          .ref(urlMessagesUser)
          .set(dataHistoryChatUser);

        Firebase.database()
          .ref(urlMessagesDoctor)
          .set(dataHistoryChatDoctor);

        setMounted(false);
      })
      .catch(err => {
        showError(err.message);
      });
  };

  return (
    <View style={styles.page}>
      <Header
        type="dark-profile"
        headerTitle={dataDoctor.data.fullName}
        desc={dataDoctor.data.category}
        onPress={() => navigation.goBack()}
        photo={
          dataDoctor.data.photo ? {uri: dataDoctor.data.photo} : ILNullPhoto
        }
      />
      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({animated: true})
          }>
          {chats.map(cur => {
            return (
              <View key={cur.date}>
                <Text style={styles.date}>{cur.date}</Text>
                {cur.data.map(current => {
                  const isMe =
                    current.data.sendBy === userID.uid ? true : false;
                  return (
                    <Chatitem
                      id={`${createUUID}-${cur.id}`}
                      isSender={
                        current.data.sendBy === userID.uid ? true : false
                      }
                      text={current.data.chatContent}
                      date={current.data.chatTime}
                      photo={
                        isMe
                          ? null
                          : dataDoctor.data.photo
                          ? {uri: dataDoctor.data.photo}
                          : ILNullPhoto
                      }
                    />
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <InputChat
        value={chatContent}
        onChangeText={value => setChatContent(value)}
        onButtonPress={() => sendChat()}
      />
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
