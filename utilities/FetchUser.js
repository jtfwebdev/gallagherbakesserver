const axios = require('axios');

const FetchUser = async (username) => {

    const API_BASE_URL = process.env.API_BASE_URL;
    const API_APPLICATION_KEY = process.env.API_APPLICATION_KEY;
    const API_APPLICATION_PASSWORD = process.env.API_APPLICATION_PASSWORD;
    
    const header = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(API_APPLICATION_KEY + ':' + API_APPLICATION_PASSWORD)
    }

    try {
      const res = await axios.get(`${API_BASE_URL}wc/v3/customers/?search=${username}`, {headers: header});
      return res.data;
    
    }
    catch(e) 
    {
        return e;
    }
}

module.exports = FetchUser;