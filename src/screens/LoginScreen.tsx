import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    Alert,
    Keyboard,
    Text,
    TouchableOpacity,
    ActionSheetIOS,
} from 'react-native';

import { getStatusBarHeight } from 'react-native-status-bar-height';

import ApiService from "../shared/services/api.service";
import Input from "../shared/components/Input";
import Button from "../shared/components/Button";

import colors from "../shared/utils/colors";
import helpers from "../shared/utils/helpers";
import images from "../shared/utils/images";
import {GameMode} from "../shared/interfaces/gameMode.interface";

interface Props {
    navigation: any,
}
interface State {
    userInputText: string,
    selectedMode: GameMode,
    isLoading: boolean,
    gameSettings: Array<GameMode>
}

class LoginScreen extends React.Component<Props, State> {
    constructor(props){
        super(props);
        this.state = {
            userInputText: '',
            selectedMode: null,
            isLoading: false,
            gameSettings: null
        };
    }
    componentDidMount(): void {
        ApiService.getGameSettingsAsync()
            .then(result => {
                this.setState({
                    gameSettings: result
                })
            });
    }
    handleShowActionSheet(){
        const buttons = this.state.gameSettings.map(mode => mode.name);
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Cancel', ...buttons],
                cancelButtonIndex: 0,
            },
            buttonIndex => {
                const newValue = this.state.gameSettings.find(mode => mode.name === buttons[buttonIndex - 1]);
                this.setState({
                    selectedMode: newValue
                })
            }
        )
    }

    render(){
        return(
            <View style={styles.container}>
                <Image source={images.logo}/>
                <View style={styles.formContainer}>

                    <TouchableOpacity style={styles.pickerContainer} onPress={() => this.handleShowActionSheet()}>
                        <Text style={styles.pickerTitle}>{this.state.selectedMode !== null ? this.state.selectedMode.name : 'Pick game mode'}</Text>
                        <Image source={images.chevronRight}/>
                    </TouchableOpacity>

                    <Input
                        autoFocus = {false}
                        placeholderText = 'User name'
                        additionalStyle={styles.textInput}
                        value={this.state.userInputText}
                        onChangeText={(text) => this.setState({userInputText: text})}/>
                    <Button
                        title={'Play'}
                        type={'primary'}
                        additionalStyle={styles.button}
                        onPressAction={() => {
                            if(this.state.userInputText !== '' && this.state.selectedMode !== null){
                                const values = {
                                    username: this.state.userInputText,
                                    mode: this.state.selectedMode
                                };
                                this.props.navigation.navigate('GameScene', {values});
                                Keyboard.dismiss()
                            } else {
                                Alert.alert(
                                    'WTF bro?',
                                    'Select mode and enter your name',
                                    [{text: 'Got it', onPress: () => {}}]

                                )
                            }

                        }}/>
                </View>
            </View>
        );
    }
}
export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
        alignItems: 'center',
        paddingHorizontal: helpers.padding.l,
        paddingTop: getStatusBarHeight() + helpers.margin.xl
    },
    formContainer: {
        marginTop: helpers.margin.l,
        width: '100%',
    },
    textInput: {
        marginTop: helpers.margin.s,
    },
    pickerContainer: {
        marginTop: helpers.margin.s,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: helpers.size.xxl,
        width: '100%',
        backgroundColor: colors.tintColor,
        borderRadius: helpers.radius.normal,
        paddingHorizontal: helpers.padding.m,
        fontSize: helpers.fonSize.p,
    },
    pickerTitle: {
        color: 'white',
        fontSize: helpers.fonSize.p,
    },
    button: {
        marginTop: helpers.margin.m,
    },
});
