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

function post(path: string, params: object) {
    return fetch(API_URL + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
    })
}

function getGameSettingsAsync(){
    return get('game-settings')
}

function getWinnersAsync(){
    return get('winners')
}

function postResultAsync(winner: object){
    return post('winners', winner)
}

const ApiService = {
    getGameSettingsAsync,
    getWinnersAsync,
    postResultAsync
}
export default ApiService
