import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StatusBar } from 'react-native';
import { colors, screenName } from '../../utils';
import { Profile } from './Profile';
import { EditProfile } from './EditProfile';
import { ChangePassword } from './ChangePassword';
import { AddressModal } from '../auth/AddressModel';


const Stack = createStackNavigator();

export const ProfileStack = () => {
    return (
        <>
            <StatusBar
                backgroundColor={colors.primary}
                barStyle='light-content'
            />

            <Stack.Navigator
                headerMode='none'
                initialRouteName={screenName.profile}

            >
                <Stack.Screen name={screenName.profile} component={Profile} />
                <Stack.Screen name={screenName.editProfile} component={EditProfile} />
                <Stack.Screen name={screenName.changePassword} component={ChangePassword} />
                <Stack.Screen name={screenName.addressModel} component={AddressModal} />


            </Stack.Navigator>
        </>
    )
}