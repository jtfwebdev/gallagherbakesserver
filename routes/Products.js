const express = require('express');
const router = express.Router();
const axios = require('axios');

// Env variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_APPLICATION_KEY = process.env.API_APPLICATION_KEY;
const API_APPLICATION_PASSWORD = process.env.API_APPLICATION_PASSWORD;

router.get('/', (req, res) => {

    const header = {
        'Authorization': 'Basic ' + btoa(API_APPLICATION_KEY + ':' + API_APPLICATION_PASSWORD)
    }

    axios.get(`${API_BASE_URL}wc/v3/products`, {
        headers: header
    })
    .then((apiRes) => {
        res.status(200).json(apiRes.data)
    })
    .catch((apiErr) => {
        res.status(500).json({apiErr})
    })
})

module.exports = router;