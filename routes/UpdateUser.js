const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const axios = require("axios");

// Env variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_APPLICATION_KEY = process.env.API_APPLICATION_KEY;
const API_APPLICATION_PASSWORD = process.env.API_APPLICATION_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;
const WC_MASTER_KEY = process.env.WC_MASTER_KEY;
const WC_MASTER_SECRET = process.env.WC_MASTER_SECRET;

router.put("/", (req, res) => {
  const auth = jwt.verify(req.body.token, JWT_SECRET);

  if (auth) {
    const string = WC_MASTER_KEY + ":" + WC_MASTER_SECRET;

    const header = {
      "Content-Type": "application/json",
      Authorization: "Basic " + Buffer.from(string).toString("base64"),
    };

    function fetchId() {
      if (req.body.data.shipping) {
        return req.body.data.shipping.userId;
      } else if (req.body.data.billing) {
        return req.body.data.billing.userId;
      }
    }

    axios
      .put(`${API_BASE_URL}wc/v3/customers/${fetchId()}`, req.body.data, {
        headers: header,
      })
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((err) => {
        res.status(500).json({ message: "Error" });
      });
  } else res.status(401).json({ message: "invalid token" });
});

module.exports = router;
