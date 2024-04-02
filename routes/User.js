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

router.get('/', (req, res) => {

    const token = req.query.query.token

    const auth = jwt.verify(token, JWT_SECRET);

    if (auth) {
        
        const fetch = async () => {

            let requests = [];

            requests.push(FetchUser(auth.username));
            const userDetails = await Promise.all(requests);

            res.status(200).json({userDetails});
        }

        fetch();

    } else res.status(401).json({message: "invalid token"})
})

module.exports = router;