const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const FetchUser = require('../utilities/FetchUser');

// Env variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_APPLICATION_KEY = process.env.API_APPLICATION_KEY;
const API_APPLICATION_PASSWORD = process.env.API_APPLICATION_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/', (req, res) => {

    const header = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(API_APPLICATION_KEY + ':' + API_APPLICATION_PASSWORD)
    }

    const username = req.body.email;

    axios.post(`${API_BASE_URL}wc/v3/customers`, req.body, {
        headers: header
    })
    .then(async () => {

            let requests = [];

            requests.push(FetchUser(username));
            const userDetails = await Promise.all(requests);

            const token = jwt.sign({username}, JWT_SECRET);

            res.status(200).json({token, userDetails});
    })
    .catch((apiErr) => {
        console.log(apiErr)
        res.status(500).json({apiErr})
    })
})

module.exports = router;