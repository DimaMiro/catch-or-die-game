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
    heroCoordinates: Array<number>,
    pastHeroes: Array<Array<number>>,
    missed: Array<Array<number>>,
    saved: Array<Array<number>>,
    mode: GameMode,
}

export default class GameSceneScreen extends React.Component<Props, State> {

    constructor(props){
        super(props);
        this.state = {
            heroCoordinates: [],
            pastHeroes: [],
            missed: [],
            saved: [],
            mode: {
                name: 'Ease',
                field: 3,
                delay: 2000
            }
        }
    }
    componentDidMount(): void {
        this.randomHero()
    }

    renderScene(){
        // console.log('Past' + this.state.pastHeroes);
        const rowsForRender = [];
        for(let r = 0; r < this.state.mode.field; r++) {
            const tilesForRender = [];
            for(let i = 0; i < this.state.mode.field; i++){
                tilesForRender.push(<Tile coordinates={[r, i]} key={i} isHero={JSON.stringify([r, i]) === JSON.stringify(this.state.heroCoordinates)} onPress={() => this.randomHero()}/>)
            }
            rowsForRender.push(<View key={r} style={styles.row}>{tilesForRender}</View>)
        }
        return rowsForRender
    }

    randomHero(){
        const newHero = [Math.floor(Math.random() * this.state.mode.field), Math.floor(Math.random() * this.state.mode.field)];
        console.log(this.isHeroExistInPastHeroesArray(newHero));
        if (!this.isHeroExistInPastHeroesArray(newHero)) {
            console.log('PAST' + this.state.pastHeroes);
            this.setState(prevState => ({
                heroCoordinates: newHero,
                pastHeroes: [...prevState.pastHeroes, newHero]
            }));
        } else {
            if (Math.pow(this.state.mode.field, this.state.mode.field) < this.state.pastHeroes.length) {
                this.randomHero();
            } else {
                console.log('END GAME')
            }
        }
    }

    isHeroExistInPastHeroesArray(newHero) {
        for (let i = 0; i < this.state.pastHeroes.length; i++){
            if (JSON.stringify(this.state.pastHeroes[i]) === JSON.stringify(newHero)) {
                return true;
            }
        }
        return false
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
