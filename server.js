const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

/*
var corsOption = {
    origin: "http://localhost:4200"
};
*/

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const dbConfig = require("./app/config/db.config");

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

db.mongoose
  .connect(dbConfig.DB).then(
  () => { 
    console.log('Successfully connected to MongoDB') },
    err => { console.log('Cannot connect to the database' + err) }
);


//routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/appliance.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});