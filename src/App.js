import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import FlashMessage from 'react-native-flash-message';
import {Provider, useSelector} from 'react-redux';
import store from './redux/store';
import {Loading} from './component';
import {YellowBox} from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

const MainApp = () => {
  const stateGlobal = useSelector(state => state);
  YellowBox.ignoreWarnings(['Setting a timer']);
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {stateGlobal.loading && <Loading />}
    </>
  );
};
export default App;
