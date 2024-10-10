const express = require('express')
const mongoose = require('mongoose');

const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
    res.send('Node.js API REST!');
})

mongoose.connect("mongodb+srv://drumlife182:cfg8VcXJCMUdAelA@backenddb.yhq3n.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB").then(() => {
    console.log("Connected to mongodb");
})
.catch(() => {
    console.log("Connection failed");
})