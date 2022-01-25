import axios from 'axios';


const instance=axios.create({
    //The API (Cloud function) url.  endpoint API
    // baseURL: 'http://localhost:5001/challenge-11c1d/us-central1/api' //ei kane last e /api ace krn oi backend funtions er index.js e last er dikhe listen command e exports.api = functions.https.onRequest(app);  er exports er por .api dewa oi ta
    baseURL: 'http://localhost:5001/challenge-11c1d/us-central1/api'
})

export default instance;