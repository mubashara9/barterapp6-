import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import SettingScreen from '../screens/SettingScreen';
import MyBarter from '../screens/MyBarter'

export const AppDrawerNavigator=createDrawerNavigator({
    Home:{
        screen:AppTabNavigator
    },
    MyBarter:{
        screen:MyBarter
    },
    Setting:{screen:SettingScreen},
},
{
    contentComponent:CustomSideBarMenu
},
{
    initialRouteName:'Home'
}
)