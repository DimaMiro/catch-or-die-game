import React from "react";
import {StyleSheet, Text, View} from "react-native";
import colors from "../shared/utils/colors";
import helpers from "../shared/utils/helpers";

import Tile from "../components/Tile";

export default class GameSceneScreen extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.scene}>
                    <View style={styles.row}>
                        <Tile/>
                        <Tile/>
                        <Tile/>
                        <Tile/>
                        <Tile/>
                    </View>
                    <View style={styles.row}>
                        <Tile/>
                        <Tile/>
                        <Tile/>
                        <Tile/>
                        <Tile/>
                    </View>
                    <View style={styles.row}>
                        <Tile/>
                        <Tile/>
                        <Tile/>
                        <Tile/>
                        <Tile/>
                    </View>
                    <View style={styles.row}>
                        <Tile/>
                        <Tile/>
                        <Tile/>
                        <Tile/>
                        <Tile/>
                    </View>
                    <View style={styles.row}>
                        <Tile/>
                        <Tile/>
                        <Tile/>
                        <Tile/>
                        <Tile/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.bgColor,
        paddingHorizontal: helpers.padding.l
    },
    scene: {
        width: '100%',
        height: 320,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    tile: {
        flex: 1,
        backgroundColor: colors.tintColor,
        margin: helpers.margin.xs,
        borderRadius: helpers.radius.small
    }
});
