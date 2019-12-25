import React from 'react';
import {View, StyleSheet, Image, Alert, Keyboard, Text} from 'react-native';

import { Formik } from 'formik';

import Input from "../shared/components/Input";
import Button from "../shared/components/Button";

import colors from "../shared/utils/colors";
import helpers from "../shared/utils/helpers";
import images from "../shared/utils/images";

interface Props {
    navigation: any,
}
interface State {
    userInputText: string,
    isLoading: boolean,
}

class LoginScreen extends React.Component<Props, State> {
    state = {
        userInputText: '',
        isLoading: false,
    };

    render(){
        return(
            <View style={styles.container}>
                <Image source={images.logo}/>
                <View style={styles.formContainer}>
                    <Formik initialValues={{username: ''}} onSubmit={values => {
                        this.props.navigation.navigate('GameScene', {values});
                        Keyboard.dismiss()}}>
                        {({handleChange, handleSubmit, values: {username}}) => (
                            <View>
                                <Input
                                    autoFocus = {true}
                                    placeholderText = 'User name'
                                    additionalStyle={styles.textInput}
                                    value={username}
                                    onChangeText={handleChange('username')}/>
                                <Button
                                    title={'Play'}
                                    type={'primary'}
                                    additionalStyle={styles.button}
                                    onPressAction={handleSubmit}/>
                            </View>
                        )}
                    </Formik>
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
        justifyContent: 'center',
        paddingHorizontal: helpers.padding.l,
        paddingBottom: 170,
    },
    formContainer: {
        marginTop: helpers.margin.xl,
        width: '100%',
    },
    textInput: {
        marginTop: helpers.margin.s,
    },
    button: {
        marginTop: helpers.margin.m,
    },
    hintText: {
        textAlign: 'center',
        marginTop: helpers.margin.s,
        color: 'rgba(255,255,255, 0.5)',
        fontSize: helpers.fonSize.caption
    }
});
