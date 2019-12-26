import React from "react";
import {Text, View, StyleSheet, ActivityIndicator, ScrollView} from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import colors from "../shared/utils/colors";
import helpers from "../shared/utils/helpers";
import ApiService from "../shared/services/api.service";
import {Winner} from "../shared/interfaces/winner.interface";
import WinnerRow from "../components/WinnerRow";
import Button from "../shared/components/Button";

interface Props {
    navigation: any,
}
interface State {
    isLoading: boolean,
    winnerList: Array<Winner>,
}

export default class WinnersScreen extends React.Component<Props, State> {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            winnerList: [],
        }
    }

    componentDidMount(): void {
        ApiService.getWinnersAsync().then(res => {
            this.setState({
                winnerList: res.reverse()
            })
        })
    }

    getWinnersBlock() {
        if(this.state.isLoading) {
            return <ActivityIndicator style={{marginTop: helpers.margin.m}}/>
        } else {
            if (typeof this.state.winnerList !== 'undefined' && this.state.winnerList.length > 0) {
                return this.state.winnerList.map(winner => {
                    return <WinnerRow key={winner.id} winner={winner}/>
                })
            } else {
                return <Text>No repos here</Text>
            }
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={[styles.headerContainer]}>
                    <Text style={styles.title}>Winners</Text>
                </View>
                <ScrollView style={styles.scrollContainer}>
                    {this.getWinnersBlock()}
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <Button
                        title={'Play new Game'}
                        type={'primary'}
                        additionalStyle={styles.button}
                        onPressAction={()=>this.props.navigation.navigate('Login')}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: '100%',
        paddingTop: getStatusBarHeight() + helpers.padding.s,
        paddingBottom: helpers.padding.xl,
        paddingHorizontal: helpers.padding.m,
        overflow: 'hidden'
    },
    scrollContainer: {
        paddingHorizontal: helpers.padding.m
    },
    title: {
        color: 'white',
        fontSize: helpers.fonSize.title,
        fontWeight: '600',
    },
    buttonContainer: {
        paddingHorizontal: helpers.padding.m
    },
    button: {
        marginTop: helpers.margin.s,
        marginBottom: helpers.margin.xl
    },
});
