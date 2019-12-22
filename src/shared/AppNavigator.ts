import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from "../screens/LoginScreen";
import GameSceneScreen from "../screens/GameSceneScreen";
import WinnersScreen from "../screens/WinnersScreen";

const RootStack = createStackNavigator(
    {
        Login: LoginScreen,
        GameScene: GameSceneScreen,
        Winners: WinnersScreen,
    },
    {
        defaultNavigationOptions: {
            header: null
        },
        initialRouteName: 'GameScene',
    },
)
const AppContainer = createAppContainer(RootStack)

export default AppContainer
