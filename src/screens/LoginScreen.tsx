import React from "react";
import {StyleSheet, Text, View} from "react-native";
import colors from "../shared/utils/colors";

export default class LoginScreen extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <Text>LoginScreen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.bgColor
    },
});
