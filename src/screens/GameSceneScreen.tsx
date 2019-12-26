import React from "react";
import {Alert, StyleSheet, Text, View} from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import colors from "../shared/utils/colors";
import helpers from "../shared/utils/helpers";


import Tile from "../components/Tile";
import Button from "../shared/components/Button";
import {GameMode} from "../shared/interfaces/gameMode.interface";

interface Props {
    navigation: any,
    username: string,
    mode: GameMode
}
interface State {
    username: string,
    heroCoordinates: Array<number>,
    pastHeroes: Array<Array<number>>,
    missed: Array<Array<number>>,
    saved: Array<Array<number>>,
    mode: GameMode,
    winner: 'user' | 'computer' | null
}

export default class GameSceneScreen extends React.Component<Props, State> {
    private timer: number;

    constructor(props){
        super(props);
        this.state = {
            username: this.props.navigation.getParam('values').username,
            heroCoordinates: [],
            pastHeroes: [],
            missed: [],
            saved: [],
            mode: this.props.navigation.getParam('values').mode,
            winner: null
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
        if (this.state.winner === null) {
            this.checkForWinner();
            this.timer = setTimeout(() => {
                this.state.missed.push(this.state.heroCoordinates);
                this.randomHero();
                this.startCounting();
            }, this.state.mode.delay);
        }
    }

    handleHeroPress(){
        if (this.state.winner === null) {
            this.state.saved.push(this.state.heroCoordinates);
            this.randomHero();
            clearInterval(this.timer);
            this.startCounting()
        }
    }

    randomHero(){
        if(this.state.winner === null){
            const newHero = [Math.floor(Math.random() * this.state.mode.field), Math.floor(Math.random() * this.state.mode.field)];
            if (!this.isHeroExistInArray(this.state.pastHeroes, newHero)) {
                this.setState(prevState => ({
                    heroCoordinates: newHero,
                    pastHeroes: [...prevState.pastHeroes, newHero]
                }));
            } else {
                this.randomHero();
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

    checkForWinner(){
        if(this.state.missed.length >= Math.pow(this.state.mode.field, 2) / 2){
            console.log('Computer WIN')
            this.setState({
                winner: 'computer'
            })
        } else if(this.state.saved.length >= Math.pow(this.state.mode.field, 2) / 2){
            console.log('User WIN')
            this.setState({
                winner: 'user'
            })
        }
    }

    resetGame(){
        this.setState({
            heroCoordinates: [],
            pastHeroes: [],
            missed: [],
            saved: [],
            mode: {
                name: 'Ease',
                field: this.state.mode.field,
                delay: 800
            },
            winner: null
        });
        this.randomHero();
        clearInterval(this.timer);
        this.startCounting()
    }

    render() {
        return(
            <View style={styles.container}>
                {this.state.winner === null ?
                    <Text style={styles.title}>Hurry on.{"\n"}Tap the 🥚 to save it.</Text>
                :
                    this.state.winner === 'user' ?
                        <Text style={[styles.title, {fontSize: helpers.fonSize.title, fontWeight: '600', textTransform: 'capitalize',}]}>You won!</Text>
                        :
                        <Text style={[styles.title, {fontSize: helpers.fonSize.title, fontWeight: '600', textTransform: 'capitalize',}]}>{this.state.winner} won!</Text>}

                <View style={styles.scene}>
                    {this.renderScene()}
                </View>
                <View style={styles.buttonContainer}>
                    {this.state.winner !== null && <Button
                            title={'Share'}
                            type={'primary'}
                            additionalStyle={styles.button}
                            onPressAction={()=>this.resetGame()}/>}

                    <Button
                        title={'Reset'}
                        type={'secondary'}
                        additionalStyle={styles.button}
                        onPressAction={()=>this.resetGame()}/>
                </View>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
        paddingTop: getStatusBarHeight(),
        paddingHorizontal: helpers.padding.l
    },
    title: {
        fontSize: helpers.fonSize.p,
        position: 'absolute',
        top: getStatusBarHeight() + helpers.margin.xl,
        left: helpers.padding.l,
        width: '100%',
        color: 'white',
        textAlign: 'center',
    },
    scene: {
        marginTop: helpers.margin.xxl,
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
    },
    buttonContainer: {
        position: 'absolute',
        bottom: helpers.margin.xl,
        left: helpers.padding.l,
        width: '100%'
    },
    button: {
        marginTop: helpers.margin.s,
    },
});
