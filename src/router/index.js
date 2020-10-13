import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Splash,
  GetStarted,
  Register,
  Login,
  UploadPhoto,
  Doctors,
  Messages,
  Hospitals,
  ChooseDoctor,
  Chat,
  UserProfile,
  EditProfile,
  DoctorProfile,
  NewsDetail,
} from '../pages';
import {BottomNavigator} from '../component';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="DOCTOR" component={Doctors} />
      <Tab.Screen name="MESSAGES" component={Messages} />
      <Tab.Screen name="HOSPITAL" component={Hospitals} />
    </Tab.Navigator>
  );
};

const Router = () => {
  const stateGlobal = useSelector(state => state.isLogin);
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      {stateGlobal === false ? (
        <>
          <Stack.Screen
            name="GetStarted"
            component={GetStarted}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="UploadPhoto"
            component={UploadPhoto}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MainApp"
            component={MainApp}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ChooseDoctor"
            component={ChooseDoctor}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="NewsDetail"
            component={NewsDetail}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="UserProfile"
            component={UserProfile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DoctorProfile"
            component={DoctorProfile}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Router;
