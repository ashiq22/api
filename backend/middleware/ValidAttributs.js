const validator = require('validator')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('./catchAsyncErrors')

//verify Attributs
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
       // return next(new ErrorHandler('Name must be alphabetic', 400))
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

