const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const empRoutes = require('./routes/EmpRoutes')
const userRoutes = require('./routes/UserRoutes')
const DB_URL = "mongodb+srv://hapoves:tIylw8LgAiHhAYy7@cluster.t2yhh.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority&appName=Cluster";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.Promise = global.Promise;

mongoose.connect(DB_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() =>{
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Error connecting to MongoDB:', err);
    process.exit();
});
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', empRoutes);
app.listen(8081, () => {
    console.log('Server is running on port 8081');
})



