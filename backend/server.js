const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const connection_string = process.env.ATLAS_URI;
mongoose.connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connection established.'))
.catch((error) => console.error("MongoDB connection failed:", error.message))

//Get Model Routes
const subjectsRouter = require('./routes/subjects');
const usersRoutes = require('./routes/users');

app.use('/api/sub', subjectsRouter);
app.use('/api/users', usersRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
