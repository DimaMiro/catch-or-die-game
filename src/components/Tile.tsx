import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import colors from "../shared/utils/colors";
import helpers from "../shared/utils/helpers";

interface Props {
    isActive: boolean
    coordinates: Array<number>,
    onPress: () => void
}

const Tile = (props: Props) => {
    return (
        <View style={styles.container}>
            {props.isActive ?
                <TouchableOpacity style={styles.activeContainer} onPress={() => props.onPress()}></TouchableOpacity>
                :
                <TouchableOpacity style={styles.disable}>
                    <Text>{props.coordinates}</Text>
                </TouchableOpacity>}

        </View>
    )
};
export default Tile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: helpers.margin.xs,
    },
    activeContainer: {
        flex: 1,
        borderRadius: helpers.radius.small,
        backgroundColor: colors.pendingColor,
    },
    disable: {
        flex: 1,
        borderRadius: helpers.radius.small,
        backgroundColor: colors.tintColor,
    }
});
