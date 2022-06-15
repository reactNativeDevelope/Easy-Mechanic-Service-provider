import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { screenName } from '../utils';
import {
  Login,
  ForgotPassword,
  VerifyOtp,
  ResetPassword,
  Thanks,
  Register,
  AddressModel,
  Categories,
  Terms
 
} from '../container/auth';

const Stack = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      headerMode='none'
      initialRouteName={screenName.login}
      screenOptions={{
        gestureEnabled: false
      }} >
      <Stack.Screen name={screenName.login} component={Login} />
      <Stack.Screen name={screenName.forgotPassword} component={ForgotPassword} />
      <Stack.Screen name={screenName.verifyOtp} component={VerifyOtp} />
      <Stack.Screen name={screenName.resetPassword} component={ResetPassword} />
      <Stack.Screen name={screenName.register} component={Register} />
      <Stack.Screen name={screenName.addressModel} component={AddressModel} />
      <Stack.Screen name={screenName.thanks} component={Thanks} />
      <Stack.Screen name={screenName.categories} component={Categories} />
      <Stack.Screen name={screenName.terms} component={Terms} />

    </Stack.Navigator>
  )
}