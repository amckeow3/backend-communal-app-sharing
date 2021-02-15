import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userModel from './models/user-model';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

const url = 'mongodb://localhost:27017/project';

//DB connection 
mongoose.connect(url)
        .then(() => {
            console.log("Connected to the database")
            mongoose.connection.close()
        })
        .catch((connectionError) =>  {
            console.log(connectionError)
        })

//WORKS
//Gets all user accounts
router.route('/users').get((req, res) => {
    mongoose.connect(url)
    .then(() => {
        console.log("Connected to the database")
        userModel.find({})
            .then((data) => {
                console.log(data);
                res.send(data);
                mongoose.connection.close(); 
            })
            .catch(connectionError => {
                console.log("Error retrieving user data", connectionError);
            })
        .catch((connectionError) =>{
            console.log("Error connecting to mongodb", connectionError)
        });
    });
});

//Retrieving a user by id
router.route('/users/:id').get((req, res) => {
    userModel.findById(req.params.id, (err, User) => {
        if (err)
            console.log(err);
        else  
            res.json(user);
    });
});

//WORKS
//Function to add new user to database
router.route('/signup').post((req, res) => {
   console.log(req.body);
   let newUser = new userModel({
       email: req.body.email,
       password: req.body.password,
       first_name: req.body.first_name,
       last_name: req.body.last_name,
       address: req.body.address,
       zipcode: req.body.zipcode,
       phone: req.body.phone
   });
   mongoose.connect(url)
   .then(() => {
        console.log("Connected to the database")
        userModel.insertMany(newUser)
        .then((data) => {
            console.log("Inserted Successfully", data);
            mongoose.connection.close();
            res.statusCode = 202;
            res.end("data successfully added");
        })
        .catch(err => {
            console.log("Unable to insert data into your collection", err);
        });
   });
    
})

//Deleting a user by id
router.route('/users/delete/:id').get((req, res) => {
    userModel.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
        if (err)
            res.json(err);
        else
            res.json('Removed successfully');
    });
});

app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));