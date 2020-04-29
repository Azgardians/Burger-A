import axios from 'axios';

const instance = axios.create({
    baseURL:'https://burger-app-52ae3.firebaseio.com/'
});

export default instance;