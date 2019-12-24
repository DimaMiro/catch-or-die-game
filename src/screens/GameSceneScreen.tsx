import React from "react";
import {Alert, StyleSheet, Text, View} from "react-native";
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
    private timer: number;

    constructor(props){
        super(props);
        this.state = {
            heroCoordinates: [],
            pastHeroes: [],
            missed: [],
            saved: [],
            mode: {
                name: 'Ease',
                field: 7,
                delay: 2000
            }
        }
    }
    componentDidMount(): void {
        this.randomHero();
        this.startCounting();
    }

    renderScene(){
        const rowsForRender = [];
        for(let r = 0; r < this.state.mode.field; r++) {
            const tilesForRender = [];
            for(let i = 0; i < this.state.mode.field; i++){
                tilesForRender.push(<Tile coordinates={[r, i]} key={i}
                                          isHero={JSON.stringify([r, i]) === JSON.stringify(this.state.heroCoordinates)}
                                          isSaved={this.isHeroExistInArray(this.state.saved, [r,i])}
                                          isMissed={this.isHeroExistInArray(this.state.missed, [r,i])}
                                          onPress={() => this.handleHeroPress()}/>)
            }
            rowsForRender.push(<View key={r} style={styles.row}>{tilesForRender}</View>)
        }
        return rowsForRender
    }
    startCounting(){
        if (this.state.pastHeroes.length < Math.pow(this.state.mode.field, 2)) {
            this.timer = setTimeout(() => {
                this.state.missed.push(this.state.heroCoordinates);
                this.randomHero();
                this.startCounting();
            }, this.state.mode.delay);
        } else {
            console.log('END GAME startCounting')
        }
    }

    handleHeroPress(){
        if (this.state.pastHeroes.length < Math.pow(this.state.mode.field, 2)) {
            this.state.saved.push(this.state.heroCoordinates);
            this.randomHero();
            clearInterval(this.timer)
            this.startCounting()
        } else {
            console.log('END GAME handleHeroPress')
        }
    }

    randomHero(){
        const newHero = [Math.floor(Math.random() * this.state.mode.field), Math.floor(Math.random() * this.state.mode.field)];
        if (!this.isHeroExistInArray(this.state.pastHeroes, newHero)) {
            console.log('RANDOM')
            this.setState(prevState => ({
                heroCoordinates: newHero,
                pastHeroes: [...prevState.pastHeroes, newHero]
            }));
        } else {
            if (this.state.pastHeroes.length < Math.pow(this.state.mode.field, 2)) {
                this.randomHero();
            } else {
                console.log('END GAME randomHero')
            }
        }
    }

    isHeroExistInArray(array, newHero) {
        for (let i = 0; i < array.length; i++){
            if (JSON.stringify(array[i]) === JSON.stringify(newHero)) {
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
