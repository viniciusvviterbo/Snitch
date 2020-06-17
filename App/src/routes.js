import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Denuncia from './view/Denuncia';

export default function Routes() {
    /*
     * Implementação do design pattern singleton devido à instanciação única da view, que por sua vez, tem seus estados alterados para alcançar a finalidade da aplicação
     */
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown:false}}>
                <AppStack.Screen name="Denuncia" component={Denuncia}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
}