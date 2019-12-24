import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import colors from "../shared/utils/colors";
import helpers from "../shared/utils/helpers";

interface Props {
    isHero: boolean,
    isSaved?: boolean,
    coordinates: Array<number>,
    onPress: () => void
}

const Tile = (props: Props) => {
    return (
        <View style={styles.container}>
            {props.isHero ?
                <TouchableOpacity style={styles.heroContainer} onPress={() => props.onPress()}></TouchableOpacity>
                :
                props.isSaved ?
                    <View style={styles.savedContainer}></View>
                    :
                    <View style={styles.disable}></View>}

        </View>
    )
};
export default Tile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: helpers.margin.xs,
    },
    heroContainer: {
        flex: 1,
        borderRadius: helpers.radius.small,
        backgroundColor: colors.pendingColor,
    },
    disable: {
        flex: 1,
        borderRadius: helpers.radius.small,
        backgroundColor: colors.tintColor,
    },
    savedContainer: {
        flex: 1,
        borderRadius: helpers.radius.small,
        backgroundColor: colors.savedColor,
    }
});
