import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Denuncia from './view/Denuncia';

// <Feather name="" size={16} color='#E02041'/>

export default function Routes() {
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown:false}}>
                <AppStack.Screen name="Denuncia" component={Denuncia}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
}