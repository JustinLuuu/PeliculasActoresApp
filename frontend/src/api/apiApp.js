import axios from "axios";

// cambiar por el puerto correspondiente
const apiApp = axios.create({
    baseURL: 'http://localhost:7000'
});

export default apiApp;