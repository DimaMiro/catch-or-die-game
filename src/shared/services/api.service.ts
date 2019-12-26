import {API_URL} from '../utils/api.config';

function get(path: string) {
    return fetch(API_URL + path)
        .then((response) => {
            return response.json()
        })
        .catch((error) => {
            console.error(error);
        });
}

function getGameSettingsAsync(){
    return get('game-settings')
}

function getWinnersAsync(){
    return get('winners')
}

const ApiService = {
    getGameSettingsAsync,
    getWinnersAsync,
}
export default ApiService
