import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StatusBar } from 'react-native';
import { colors, screenName } from '../../utils';
import Categories from './Categories';
import {Home} from '../Home/Home';



const Stack = createStackNavigator();

export const CategoryStack = () => {
    return (
        <>
            <StatusBar
                backgroundColor={colors.primary}
                barStyle='light-content'
            />

            <Stack.Navigator
                headerMode='none'
                initialRouteName={screenName.categories}

            >
                <Stack.Screen name={screenName.categories} component={Categories} />

            </Stack.Navigator>
        </>
    )
}