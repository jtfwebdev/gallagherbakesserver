const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');

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

    const auth = jwt.verify(req.body.token, JWT_SECRET);
    const id = req.body.id;

    if (auth) {
        const checkDetails = {
            username: req.body.username,
            password: req.body.password
        }

        axios.post(`${API_BASE_URL}jwt-auth/v1/token`, checkDetails, {headers: header})
        .then(async () => {
            
            let requests = [];

            const data = {
                password: req.body.newPassword
            }

            async function newPassword() {
                try {
                    const res = await axios.put(`${API_BASE_URL}wc/v3/customers/${id}`, data, {headers: header});
                    return; 
                }
                catch(e) {
                    return e;
                }
            }

            requests.push(newPassword());
            const response = await Promise.all(requests);

            res.status(200).json({response});
        })
        .catch((err) => {
            res.status(401).send();
        })
    } else {
        res.status(401);
    }
})

module.exports = router;