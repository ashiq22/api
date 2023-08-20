const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('./catchAsyncErrors')
const jwt = require("jsonwebtoken");
const user = require('../models/user.models');
const agency = require('../models/agency.models');
const passwordValidator = require('password-validator');
const validator = require('validator')

//const verifier = require('email-verify');

// verify user is connected or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return next(new ErrorHandler('Login first to access this ressource.', 401))
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = await user.findById(decoded.id);
    next()
})

// verify admin is connected or not
exports.isAuthenticatedAdmin = catchAsyncErrors(async (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return next(new ErrorHandler('Login first to access this ressource.', 401))
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    req.agency = await agency.findById(decoded.id);
    next()
})

//verify strong password
// Create a schema
const passwordSchema = new passwordValidator();
// Add properties to it
passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(20)                                   // Maximum length 20                           // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.has().symbols(1)                               // Should have at least 1 Symbol
.is().not().oneOf(['Passw0rd', 'Password123']);
//Quality password
exports.isVerifiedPassword = catchAsyncErrors(async(req, res , next)=>{
    var password= req.body.password
    if (passwordSchema.validate(password)== false){
        errmsg=""
        errList = passwordSchema.validate(password, { details: true });
        errList.forEach(function(value) 
        { errmsg=errmsg+"\n"+value.message})
        // return next(new ErrorHandler("Please enter valid Password:"+errmsg.replace(/string/g,'password') , 400))
        return res.status(400).json({ error: "Please enter valid Password:"+errmsg.replace(/string/g,'password') });
    }
    next()
})

//verify email
exports.isVerifiedEmail = catchAsyncErrors(async (req, res, next) => {
    const email = req.body.email
    if (email.length === 0) {
        //return next(new ErrorHandler('Your mail mesiing @ ', 400))
        return res.status(400).json({ error: 'Your mail is required' });
   }

    if (email.indexOf("@") < 0) {
         //return next(new ErrorHandler('Your mail mesiing @ ', 400))
         return res.status(400).json({ error: 'Your mail missing @' });
    }
    if (email.indexOf(".") < email.indexOf("@")) {
        //return next(new ErrorHandler('Your mail mesiing . ', 400))
        return res.status(400).json({ error: 'Your mail mesiing .' });
    }
    next()
})

exports.VerfyAttributs = catchAsyncErrors(async (req, res, next) => {
    const fname = req.body.fname
    const lname = req.body.lname
    const phoneNum = req.body.phoneNum
    const email = req.body.email
    const  job = req.body.job
    const postalCode = req.body.postalCode
    validateAlpha = validator.isAlpha
    validateMobilPhone = validator.isMobilePhone
    validateNumber = validator.isNumeric
    validateEmail = validator.isEmail
//Verify attributs
    if(!fname.validateAlpha){
        return res.status(400).send("votre nom doit étre alphabétique', 400")

    }
    if(!lname.validateAlpha){
        return res.status(400).send("Last name must be alphabetic', 400")


        
    }
    if(!job.validateAlpha){
        return res.status(400).send("Job must be alphabetic', 400")
    }
    if(!phoneNum.validateMobilPhone){
        return res.status(400).send("numérotel incorecte', 400")
    }
    if(!postalCode.validateNumber){
        return res.status(400).send("Postal code must be number', 400")

    }
    if(!email.isEmail){
        return res.status(400).send("Please enter valid email address', 400")

        
    }
    next()
})


exports.isVerifiedEmailweb = catchAsyncErrors(async (req, res, next) => {
    const fname = req.body.fname
    const lname = req.body.lname
    const email = req.body.email
    const username = req.body.username
    const birthday = req.body.birthday
    const phoneNum = req.body.phoneNum
    const password = req.body.password
    const job = req.body.job
    const civility = req.body.civility
    const address = req.body.address
    const postalCode = req.body.postalCode
    const city = req.body.city
    const country = req.body.country








    next()
})






