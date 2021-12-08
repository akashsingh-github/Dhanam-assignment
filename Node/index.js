const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

const userRoutes = require('./Routes/user');

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fwn1v.mongodb.net/userdb?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Connected")
    console.log(mongoose.connection.readyState)
});

app.use(bodyParser.json())
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send("Hello from first page");
})




app.listen(5000, () => {
    console.log("Server running on port 5000!!!");
})