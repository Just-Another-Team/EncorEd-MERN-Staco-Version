const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

const connection_string = process.env.ATLAS_URI;
mongoose.connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connection established.'))
.catch((error) => console.error("MongoDB connection failed:", error.message))

//Get Model Routes
const subjectsRoutes = require('./routes/subjects');
const usersRoutes = require('./routes/users');

app.use('/api/subjects', subjectsRoutes);
app.use('/api/users', usersRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
