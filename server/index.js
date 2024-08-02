const express = require('express');
const cors = require('cors');
const { connect, connection } = require('mongoose');
const upload = require('express-fileupload')
require('dotenv').config()

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRouter');
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

const app = express();

app.use(cors({credentials:true, origin: "http://localhost:3000"}));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(upload());
app.use('/uploads', express.static(__dirname + "/uploads"))



const PORT = process.env.PORT || 5000;

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use(notFound);
app.use(errorHandler)

connect(process.env.MONGO_URI).then(app.listen(5000, () => console.log(`Server running ${process.env.PORT} `)))
    .catch(error => {
        console.log(`Error connecting to MongoDB: ${error.message}`);
})


connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

connection.on('error', (error) => {
  console.log(`Mongoose connection error: ${error.message}`);
});

connection.on('disconnected', () => {
  console.log('Mongoose disconnected from DB');
});

