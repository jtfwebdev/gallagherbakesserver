const express = require('express');
const cors = require('cors');
const cookies = require('cookie-parser');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cookies());
app.use(cors({
    "Access-Control-Allow-Headers": "Authorization"
}));
app.use(express.json());

//Routes

app.use('/products', require('./routes/Products'));
app.use('/login', require('./routes/Login'));
app.use('/register', require('./routes/Register'));
app.use('/user', require('./routes/User'));
app.use('/updateuser', require('./routes/UpdateUser'));
app.use('/changepassword', require('./routes/ChangePassword'));

app.listen(PORT, () => console.log('server running'));