import React, { useState, useEffect } from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack";
import { Indicator } from '../components/atoms';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { navigationRef } from './RootNavigation';
import { AuthNavigator } from "./AuthNavigator";
import { AppNavigator } from "./AppNavigator";

import { screenName } from '../utils';
import SplashScreen from 'react-native-splash-screen'
import FlashMessage from 'react-native-flash-message';

const Stack = createStackNavigator();

const Navigator = () => {

    // ****************** Hooks Functions ********************//
    const dispatch = useDispatch();
    const { user } = useSelector(state => ({
        user: state.loginReducer.loginData
    }))
    
    useEffect(() => {
        SplashScreen.hide();
    }, [])
    // const loading = useInitializer();

    // ********************* Main App ************************//

    return (
        <View style={{ flex: 1 }}>
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator
                    headerMode='none'
                >
                    {user?.token? <Stack.Screen
                        name={screenName.home}
                        component={AppNavigator}
                        
                    /> :<Stack.Screen
                    name={screenName.auth}
                    component={AuthNavigator}
                />}
                    
                    
                </Stack.Navigator>
                <Indicator />
                <FlashMessage duration={6000} color={'#ffffff'} />
            </NavigationContainer>
        </View>
    )
}

export default Navigator