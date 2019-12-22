import React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import colors from "../shared/utils/colors";
import helpers from "../shared/utils/helpers";

const Tile = () => {
    return (
        <TouchableOpacity style={styles.container}></TouchableOpacity>
    )
};
export default Tile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.tintColor,
        margin: helpers.margin.xs,
        borderRadius: helpers.radius.small
    }
});
