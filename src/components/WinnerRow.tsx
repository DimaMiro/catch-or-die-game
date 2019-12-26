import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from "../shared/utils/colors";
import helpers from "../shared/utils/helpers";
import {Winner} from "../shared/interfaces/winner.interface";


interface Props {
    winner: Winner
}

const WinnerRow = (props: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.nameLabel}>{props.winner.winner}</Text>
            <Text style={styles.dateLabel}>{props.winner.date}</Text>
        </View>
    )
};


export default WinnerRow

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.tintColor,
        borderRadius: helpers.radius.normal,
        padding: helpers.padding.l,
        marginBottom: helpers.margin.s,
    },
    nameLabel: {
        color: 'white',
        fontSize: helpers.fonSize.p
    },
    dateLabel: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: helpers.fonSize.p
    }
});
