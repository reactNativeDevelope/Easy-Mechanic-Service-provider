import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeStack } from '../container/Home';
import { CategoryStack } from '../container/Categories';
import { ProfileStack } from '../container/Profile';

import { colors, screenName } from '../utils';
import { Drawer } from '../components/molecules';

//Import Stack 
const Drawers = createDrawerNavigator();

// Drawer Navigator
export const AppNavigator = () => {
    return (
        <>
            <Drawers.Navigator
                drawerType="slide"
                initialRouteName={screenName.home}

                drawerStyle={{
                    width: '100%'
                }}

                drawerContent={(props) => <Drawer  {...props} />}

            >
                <Drawers.Screen
                    name={screenName.home}
                    component={HomeStack}
                    options={{ gestureEnabled: false ,headerShown: false}}
                />
                
                <Drawers.Screen
                    name={screenName.profile}
                    component={ProfileStack}
                    options={{headerShown: false}}

                />
                 <Drawers.Screen
                    name={screenName.categories}
                    component={CategoryStack}
                    options={{ gestureEnabled: false ,headerShown: false}}
                />
               



            </Drawers.Navigator>
        </>
    )
}