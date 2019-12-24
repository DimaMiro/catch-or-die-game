import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import colors from "../shared/utils/colors";
import helpers from "../shared/utils/helpers";
import images from "../shared/utils/images";

interface Props {
    isHero: boolean,
    isSaved?: boolean,
    isMissed?: boolean,
    coordinates: Array<number>,
    onPress: () => void
}

const Tile = (props: Props) => {
    return (
        <View style={styles.container}>
            {props.isHero ?
                <TouchableOpacity style={styles.heroContainer} onPress={() => props.onPress()}>
                    <Image source={images.heroImage} style={styles.image}/>
                </TouchableOpacity>
                :
                props.isSaved ?
                    <View style={styles.savedContainer}>
                        <Image source={images.savedImage} style={styles.image}/>
                    </View>
                    :
                    props.isMissed ?
                        <View style={styles.missedContainer}>
                            <Image source={images.missedImage} style={styles.image}/>
                        </View>
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    savedContainer: {
        flex: 1,
        borderRadius: helpers.radius.small,
        backgroundColor: colors.savedColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    missedContainer: {
        flex: 1,
        borderRadius: helpers.radius.small,
        backgroundColor: colors.missedColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    disable: {
        flex: 1,
        borderRadius: helpers.radius.small,
        backgroundColor: colors.tintColor,
    },
});
