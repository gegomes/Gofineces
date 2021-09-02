import React from "react";

import { createStackNavigator } from '@react-navigation/stack'

import { SingnIn } from "../views/Singini";

const { Navigator, Screen } = createStackNavigator()

export function AuthRoutes() {

    return (
        <Navigator >
            <Screen
                name="SingnIn"
                component={SingnIn}
                options={{
                    headerShown: false
                }}
            />
        </Navigator>

    )
}