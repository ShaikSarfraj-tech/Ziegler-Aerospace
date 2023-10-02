const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const userRouter = require('./routes/userRouter');

const PORT = 5000 | process.env.PORT;

const connect = async () => {
    try {
        const mongo_url = 'mongodb+srv://Sarfraj:UseSarfrajData120@cluster0.rse9f.mongodb.net/ziegler_aerospace';
        await mongoose.connect(mongo_url);
        console.log("Connected to mongoDB");
    } catch(error) {
        throw error;
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB Disconnected!");
});

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(userRouter);

app.get('/', (req, res) => {
    res.send('Welcome to Backend');
})

app.listen(PORT, (req, res) => {
    connect();
    console.log(`Server is listening on ${PORT}`);
})