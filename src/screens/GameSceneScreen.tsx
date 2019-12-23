import React from "react";
import {StyleSheet, Text, View} from "react-native";
import colors from "../shared/utils/colors";
import helpers from "../shared/utils/helpers";

import Tile from "../components/Tile";
import {GameMode} from "../shared/interfaces/gameMode.interface";

interface Props {
    navigation: any,
    mode: GameMode
}
interface State {
    mode: GameMode
}

export default class GameSceneScreen extends React.Component<Props, State> {

    constructor(props){
        super(props);
        this.state = {
            mode: {
                name: 'Ease',
                field: 7,
                delay: 2000
            }
        }
    }
    renderScene(){
        const rowsForRender = [];
        for(let r = 0; r < this.state.mode.field; r++) {
            const tilesForRender = [];
            for(let i = 0; i < this.state.mode.field; i++){
                tilesForRender.push(<Tile key={i} isActive={false}/>)
            }
            rowsForRender.push(<View key={r} style={styles.row}>{tilesForRender}</View>)
        }
        return rowsForRender
    }

    render() {
        return(
            <View style={styles.container}>

                <View style={styles.scene}>
                    {this.renderScene()}
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
