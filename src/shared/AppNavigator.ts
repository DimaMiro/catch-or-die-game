import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import LoginScreen from "../screens/LoginScreen";
import GameSceneScreen from "../screens/GameSceneScreen";
import WinnersScreen from "../screens/WinnersScreen";

const RootStack = createSwitchNavigator(
    {
        Login: LoginScreen,
        GameScene: GameSceneScreen,
        Winners: WinnersScreen,
    },
    {
        initialRouteName: 'Login',
    },
)
const AppContainer = createAppContainer(RootStack)

export default AppContainer
