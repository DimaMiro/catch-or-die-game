import React from "react";
import {Text, View, StyleSheet} from "react-native";
import colors from "../shared/utils/colors";


export default class WinnersScreen extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <Text>WinnersScreen</Text>
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
