const express = require('express');
const Useer = require('../models/User'); //import user from models
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'agoodsecretisalwaysbetter'; // to sign our web token

// ROUTE 1 : Create a  User: POST "/api/auth/createuser" endpoint.
// Doesn't require Auth(No login required)

router.post('/createuser',[
    // we can use custom text in case of errors
    body('name', 'Enter a valid Name').isLength({min: 3}),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({min: 5})
],  async(req, res)=> {
    // obj = {
    //     a: "thios",
    //     number: '34'
    // }
    // res.json(obj)
    // ................
    // console.log(req.body);
    // const user = Useer(req.body);
    // user.save();
    // .................
    
    const errors = validationResult(req); //imported using express validator

    let success = false;
    // if there are errors, return Bad request and errors
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors : errors.array()})
    }
    
    //Check whether the user with same email exists already.
    try {
        let user = await Useer.findOne({email: req.body.email})
        if(user) {
            return res.status(400).json({error: "Sorry a user with this email already exists"})
        }

        //Hashing the password and storing it.
        //here 10 is salt rounds
        //both functions return promise hence await
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //Creating a new user, using await because of endpoint
        user = await Useer.create({
            name: req.body.name,
            password: secPass,  //instead of req.body.password for security we are storing its hash
            email: req.body.email
        })
        
        const data = {
            user : {
                id : user.id //as id of user is unique we are sending the id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET, {  //sign data using secret key
            expiresIn: '1h',
        });
        // console.log(authToken);

        // res.json(user); // instead of sending user we send auth token
        // res.json(authToken); //this will send value
        success = true;
        res.json({success, authToken});
        // res.json({"user" : "created successfully"});
        
    } catch (error) {
        console.log(error); //for console
        res.status(500).send("Internal server error") //to send message
    }
    
    // .then(user => res.json(user))
    // .catch(err => {console.log(err) //in case there is error log error so that app doesn't crash
                //there may not always be unique value for email error present
    //     res.json({error: 'Please enter a unique value for email', message : err.message})})
    

    //no need to do as already res.json is done
    // res.send(req.body); 
})


// ROUTE 2 : Authenticate a User: POST "/api/auth/login" endpoint.
// Doesn't require Auth(No login required)

router.post('/login',[
    // we can use custom text in case of errors
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists()
],  async(req, res)=> {
    
    const errors = validationResult(req);
    // if there are errors, return Bad request and errors
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors : errors.array()})
    }

    //get email and pwd by destructuring
    const{email, password} = req.body;
    let success = false;

    try {
        let user = await Useer.findOne({email});

        if(!user) {
            return res.status(400).json({error: "Please login with correct credentials"});
        }

        const passCompare = await bcrypt.compare(password, user.password);

        if(!passCompare) {
            return res.status(400).json({error: "Please login with correct credentials"});
        }

        //if no error, successfull login
        const data = {
            user : {
                id : user.id
            }
        }
        success = true;

        //we can create a expiring token also refer jwt token documentation
        const authToken = jwt.sign(data, JWT_SECRET, {
            expiresIn: '1h',
          });
        res.json({success, authToken});

    } catch (error) {
        console.log(error.message); //for console
        res.status(500).send("Internal server error") //to send message
    }
});


// ROUTE 3 : Get loggedin User details using : POST "/api/auth/getuser" endpoint.
// require Auth(Login required)

//Here using jwt token we are going to fetch user details

router.post('/getuser', fetchuser, async(req, res)=> { //fetchuser is middleware

try {
    const userId = req.user.id;
    const user = await Useer.findById(userId).select("-password"); //to exclude password(hashed of course) from user data
    res.json(user);
} catch (error) {
    console.log(error.message); //for console
    res.status(500).send("Internal server error") //to send message
}

})



module.exports = router;