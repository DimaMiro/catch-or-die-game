import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import colors from "../utils/colors";
import helpers from "../utils/helpers";

const Input = (props) => {
    return <TextInput
        style={[styles.textInput, props.additionalStyle]}
        placeholder={props.placeholderText}
        placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
        onChangeText={props.onChangeText}
        value={props.value}
        autoFocus = {props.autoFocus}/>
};

export default Input

const styles = StyleSheet.create({
    textInput: {
        height: helpers.size.xxl,
        width: '100%',
        backgroundColor: colors.tintColor,
        color: 'white',
        borderRadius: helpers.radius.normal,
        paddingHorizontal: helpers.padding.m,
        fontSize: helpers.fonSize.p,
    }
});
