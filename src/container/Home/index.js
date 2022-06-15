import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StatusBar } from 'react-native';
import { colors, screenName } from '../../utils';
import { Home } from './Home';
import { Supplier } from './Supplier';
import { Mechanics } from './Mechanics';
import { SpareParts } from './SpareParts';


const Stack = createStackNavigator();

export const HomeStack = () => {
    return (
        <>
            <StatusBar
                backgroundColor={colors.primary}
                barStyle='light-content'
            />

            <Stack.Navigator
                headerMode='none'
                initialRouteName={screenName.home}

            >
                <Stack.Screen name={screenName.home} component={Home} />
                {/* <Stack.Screen name={screenName.supplier} component={Supplier} />
                <Stack.Screen name={screenName.mechanics} component={Mechanics} />
                <Stack.Screen name={screenName.sparePart} component={SpareParts} />
 */}

            </Stack.Navigator>
        </>
    )
}