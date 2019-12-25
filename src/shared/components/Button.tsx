import React from 'react';
import {TextInput, StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from "../utils/colors";
import helpers from "../utils/helpers";

interface Props {
    title: string,
    additionalStyle: object,
    onPressAction: () => void,
    type: 'primary' | 'secondary'
}

const Button = (props: Props) => {
    return (
        <TouchableOpacity style={[styles.rootStyles, props.type === 'primary' ? styles.primaryButton : styles.secondaryButton, props.additionalStyle]} onPress={props.onPressAction}>
            <Text style={styles.buttonTitle}>{props.title}</Text>
        </TouchableOpacity>)
};

export default Button

const styles = StyleSheet.create({
    rootStyles: {
        justifyContent: 'center',
        height: helpers.size.xxl,
        width: '100%',
        borderRadius: helpers.radius.normal,
        paddingHorizontal: helpers.padding.m,
    },
    primaryButton: {
        backgroundColor: colors.accentColor,
    },
    secondaryButton: {
        backgroundColor: colors.tintColor,
    },
    buttonTitle: {
        color: 'white',
        fontSize: helpers.fonSize.p,
        textAlign: 'center',
    },
});
