const User = require('../models/user.models');
const Voyage = require('../models/voyage.models');
const Contact = require('../models/contact.models')
const Reservation = require('../models/reservation.models');
const ErrorHandler = require('../utils/errorHandler');
const config = require("../config/auth.config");
const sendToken = require('../utils/JWT_Token');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const Voyagee = require('../models/voyageresult.models').Voyagee;
const genUsername = require("unique-username-generator");
var jwt = require("jsonwebtoken");
const nodemailer = require("../config/nodemailer.config");
const PDFGenerator = require('pdfkit')
const fs = require('fs')
const path = require('path');
const validator = require('validator')




//register user
exports.registerUser = async (req, res, next) => {

    var id_user = "#";
    var userExist;

    const token = jwt.sign({ email: req.body.email }, config.secret)
    try {
        const { fname, lname, username,
            phoneNum, email,
            password, job, civility,
            address, postalCode, city, birthday,
            country } = req.body;
        const confirmationCode = token;
        userExist = await User.findOne({ email: req.body.email })
        userUsername = await User.findOne({ username: req.body.username })



        if (fname.length === 0) {
            return res.status(404).send('Votre nom est obligatoire');
        }

        if (lname.length === 0) {
            return res.status(404).send('Votre prénom est obligatoire');
        }

        if (username.length === 0) {
            return res.status(404).send('Votre username est obligatoire');
        }

        if (birthday.length === 0) {
            return res.status(404).send('Votre date de naissance est obligatoire');
        }

        if (!phoneNum) {
            return res.status(404).send('Votre numéro de téléphone est obligatoire');
        }



        if (email.length === 0) {
            return res.status(404).send('Votre email est obligatoire');
        }

        if (email.indexOf("@") < 0) {
            return res.status(404).send('Il manque "@" dans votre mail.');
        }
        if (email.indexOf(".") < email.indexOf("@")) {
            return res.status(404).send('Il manque un point "." dans votre mail.');
        }
        if (password.length === 0) {
            return res.status(404).send('Votre mot de passe est obligatoire');
        }
        if (job.length === 0) {
            return res.status(404).send('Votre formation est obligatoire');
        }

        if (civility.length === 0) {
            return res.status(404).send('Votre civilité est obligatoire');
        }

        if (address.length === 0) {
            return res.status(404).send('Votre address est obligatoire');
        }


        if (!postalCode) {
            return res.status(404).send("votre code postale est obligatoire")

        }


        if (city.length === 0) {
            return res.status(404).send('Votre ville est obligatoire');
        }

        if (userUsername) {
            return res.status(404).send("votre username déja utilisé")
        }

        if (userExist) {
            return res.status(404).send("votre email déja existe")
        }

        id_user = id_user + genUsername.generateFromEmail(email, 3)
        const user = await User.create({
            fname, lname, username,
            birthday, phoneNum, email,
            password, job, civility,
            address, postalCode, city,
            country, id_user,
            confirmationCode,
        })
        res.send({
            message:
                "User was registered successfully! Please check your email",
        });
        nodemailer.sendConfirmationEmail(
            user.username,
            user.email,
            user.confirmationCode
        );
    } catch (e) {
        console.log(e.message)
    }
}
//find user by email
exports.findUserByEmail = async (req, res, next) => {
    const user = await User.findOne({ email: req.params.email })
    if (!user) {
        return res.status(404).send("Username ou Email incorrect")
    } else {
        // res.status(200).json(user)
        return sendToken(user, 200, res)

    }
}
//login user 
exports.loginUser = (async (req, res, next) => {
    const password = req.body.password;
    const credentels = req.body.credentels;
    var user;
    if (!credentels || !password) {
        return res.status(404).send("Veuillez entrer votre nom d'utilisateur ou email et votre mot de passe")
    }
    if (credentels.indexOf('@') === -1) {
        user = await User.findOne({ username: credentels }).select('+password')
        if (!user) {
            return res.status(404).send("Username ou Email incorrect")
        }
        if (user.status != "Active") {
            return res.status(404).send("Votre compte n'est pas encore activé")
        }

    } else {
        user = await User.findOne({ email: credentels }).select('+password')
        if (!user) {
            return res.status(404).send("Email ou username incorrect")
        }
        if (user.status != "Active") {
            return res.status(404).send("Votre compte n'est pas encore activé")
        }
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return res.status(404).send("Mot de passe incorrect")
    }
    sendToken(user, 200, res)
})
//loged user
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})



//contact user
exports.Contacter = async (req, res, next) => {
    const { nomUser, emailUser, texte, status, texteRep } = req.body;
    if (!nomUser) {
        return res.status(404).send("Veuillez entrer votre nom")
    }

    if (!emailUser) {
        return res.status(404).send("Veuillez entrer votre email")
    }

    if (!texte) {
        return res.status(404).send("Veuillez entrer votre message")
    }
    else {
        const Contactuser = await Contact.create({
            nomUser, emailUser, texte, status, texteRep
        })
        res.status(200).json({
            success: true,
            message: `Contact ajouter`,
            return: Contactuser
        }
        )
    }

}

//liste des contact

exports.listeContact = async (req, res) => {
    const listeContact = await Contact.find({ $or: [{ status: "Pending" }] })
    res.status(200).json(listeContact)
}

//Forget password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).send(
            "email incorrect"
        )
    }
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    // const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;
    const resetUrl = `https://localhost:4200/forgetpassword/resetPassword?token=${resetToken}`

    const message =
        `Vous nous avez demandé de réinitialiser votre mot de passe oublié.
             Pour terminer le processus, veuillez cliquer sur le lien ci-dessous :\n\n${resetUrl}\n\n`
    try {
        await sendEmail({
            email: user.email,
            subject: 'MalaBus password ',
            message
        })
        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
})
//Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })/*
    if (!user) {
        return res.status(400).send("votre email  incorecte")
    }
    */
    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).send("Les mots de passe ne correspondent pas")
    }
    // Setup new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res)
})
//find user by id
exports.getUserProfil = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }
    catch (err) {
        res.status(500).json(err)
    }
}
// Update user profile 
exports.updateProfile = catchAsyncErrors(async (req, res) => {
    if(req.file != undefined){
      
     newUser = {
        fname: req.body.fname,
        lname: req.body.lname,
        phoneNum: req.body.phoneNum,
        job: req.body.job,
        civility: req.body.civility,
        birthday: req.body.birthday,
        postalCode : req.body.postalCode,
        city : req.body.city,
        address : req.body.address,
        imagePath: 'https://malabuss.herokuapp.com/images/' + req.file.filename

    }
}
else{
     newUser = {
        fname: req.body.fname,
        lname: req.body.lname,
        phoneNum: req.body.phoneNum,
        job: req.body.job,
        civility: req.body.civility,
        birthday: req.body.birthday,
        postalCode : req.body.postalCode,
        city : req.body.city,
        address : req.body.address

    }

}
    const user = await User.findByIdAndUpdate(req.params.id, newUser, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    sendToken(user, 200, res)
})
//verifyuser
exports.verifyUser = async (req, res, next) => {
    const user = await User.findOne({ confirmationCode: req.params.confirmationCode })
    if (!user) {
        return res.status(404).send({ message: "User Not found." });
    }
    user.status = "Active";
    user.save((err) => {
        if (err) {
            return res.status(500).send({ message: err });
        }
        res.status(200).json(user)
    });
}



//consulter liste de leur reservation
exports.listeReservationUser = async (req, res) => {
    const listeReservation = await Reservation.find({ email_User: req.body.email_User })
    res.status(200).json(listeReservation)
}


//ajouter reservation
exports.ajoutreservation = async (req, res) => {
    // instantiate the library
    try {
        let theOutput = new PDFGenerator
        let col1LeftPos = 50;
        let colTop = 150;
        let colWidth = 100;
        let col2LeftPos = colWidth + col1LeftPos + 40;
        const {
            email_User, numTel, fname, lname, nbPlace
        } = req.body.data;
        var emailTicket = "A11@gmail.com"
        var id_ticket = "M72507";
        var nbticket = 1
        id_ticket = id_ticket + genUsername.generateFromEmail(emailTicket, 3)
        const ticketnum = await Reservation.find().sort({ _id: -1 }).limit(1)
        if (
            ticketnum.length != 0
        ) {
            nbticket = ticketnum[0].nbticket + 1
        }
        //nombre de place restant du voyage reservé
        const nbPlacesrestant = await Voyage.find({ _id: req.body.id_Voyage }, { Nbrtickets: 1, _id: 0 })
        //nombre de place  supérieur npmbre de place restant 
        if (nbPlace > nbPlacesrestant[0].Nbrtickets) {
            return res.status(401).json("Nombre des places restants n'est pas sufissantes")
        }
        //nombre de place  inférieur npmbre de place restant 
        const reservation = await Reservation.create({
            prix: req.body.prix,
            nameagency: req.body.nameagency,
            arretDepart: req.body.arretDepart,
            heurArrive: req.body.heurArrive,
            heurDepart: req.body.heurDepart,
            numBus: req.body.numBus,
            arretArrive: req.body.arretArrive,
            id_Voyage: req.body.id_Voyage,
            nomLigne: req.body.nomLigne,
            dateVoyage: req.body.dateVoyage,
            email_User, numTel, fname, lname, nbPlace, id_ticket,
            nbticket
        })



        const updateNbplace = await Voyage.findByIdAndUpdate({ _id: req.body.id_Voyage }, { $inc: { Nbrtickets: -nbPlace } })
        res.send({
            message: "votre reservation ajouter avec succées ",
            reservation
        })





        //PDF

        // pipe to a writable stream which would save the result into the same directory
        theOutput.pipe(fs.createWriteStream('ticket.pdf'))

        theOutput.image('./images/malabus.PNG', 20, 20, { fit: [150, 150] }).fontSize(30).moveDown(2).fillColor('#19184A')


        theOutput.text('Nom : ', col1LeftPos, colTop, {
            bold: true


        }).fontSize(30).moveDown(0.5)



        theOutput.text(req.body.data.fname, col2LeftPos, colTop, {
            bold: true,

        }).fontSize(30).moveDown(0.5)


        theOutput.text(id_ticket, col2LeftPos + 200, colTop, {
            bold: true,
            width: 600

        }).fontSize(30).moveDown(0.5)



        theOutput.text('Ligne :', col1LeftPos, colTop + 50, {
            bold: true,

        }).fontSize(30).moveDown(0.5)
        theOutput.text(req.body.nomLigne, col2LeftPos, colTop + 50, {
            bold: true,

        }).fontSize(30).moveDown(0.5)
        theOutput.text('De :', col1LeftPos, colTop + 100, {
            bold: true,

        }).fontSize(30).moveDown(0.5)
        theOutput.text(req.body.arretDepart, col2LeftPos, colTop + 100, {
            bold: true,

        }).fontSize(30).moveDown(0.5)

        theOutput.text('Arrivé :', col1LeftPos, colTop + 150, {
            bold: true,

        }).fontSize(30).moveDown(0.5)
        theOutput.text(req.body.arretArrive, col2LeftPos, colTop + 150, {
            bold: true,

        }).fontSize(30).moveDown(0.5)



        theOutput.text('Départ :', col1LeftPos, colTop + 200, {
            bold: true,

        }).fontSize(30).moveDown(0.5)
        theOutput.text(req.body.dateVoyage + ":" + req.body.heurDepart, col2LeftPos, colTop + 200, {
            bold: true,

        }).fontSize(30).moveDown(0.5)



        theOutput.text('Tarif :', col1LeftPos, colTop + 250, {
            bold: true,

        }).fontSize(30).moveDown(0.5)


        theOutput.text(nbticket, col2LeftPos + 200, colTop + 250, {
            bold: true,
            width: 600

        }).fontSize(30).moveDown(0.5)





        theOutput.text(req.body.prix, col2LeftPos, colTop + 250, {
            bold: true,

        }).fontSize(20).moveDown(0.5).fillColor('gray');

        theOutput.text('Termes et conditions : ', 10, 450
        ).fontSize(15).moveDown(0.5)



        theOutput.text('1-Toute vente est difinitives. Le seul cas de remboursement, c’est l’annulation de la part de l’agence '
            , 10, 480, {
            width: 600

        }
        ).fontSize(15).moveDown(0.5)
        theOutput.text('2-Tout achat en ligne identifé comme frauduleux sera annulé, les tickets ne seront plus valides'
            , 10, 515, {
            width: 600

        }
        ).fontSize(15).moveDown(0.5)
        theOutput.text('3-La revente des billets est strictement interdite.'
            , 10, 550, {
            width: 600

        }
        ).fontSize(15).moveDown(0.5)



        theOutput.text('3-La revente des billets est strictement interdite.'
            , 10, 585, {
            width: 600

        }
        ).fontSize(15).moveDown(0.5)


        theOutput.text('4-Cette ticket est valable pour une seule personne. Si 2 personnes ont la même ticket, les voyageures doivent présenter leur CIN pour le contrôleur sinon, le premier voyageur seulement sera servis.Tout comportement frauduleux risque d’être poursuit juridiquement.'
            , 10, 610, {
            width: 600

        }
        ).fontSize(15).moveDown(0.5)



        theOutput.text('5- Tous les donnée dans cette ticket et vos informations personelles sont conservées en toute sécurité'
            , 10, 660, {
            width: 600

        }
        ).fontSize(15).moveDown(0.5)
        // write out file
        theOutput.end()

        message = 'Vous pouvez consulter votre ticket dans cette PDF '
        sendEmail({
            email: email_User,
            subject: 'Ticket',

            attachments: [
                {   // utf-8 string as an attachment
                    filename: "ticket.pdf", // file name, like 'test.pdf'
                    path: "C:/Proj_Malabus/Backend/ticket.pdf"
                }
            ]

        })
    }
    catch (e) {
        console.log(e.message)
    }






}


exports.rechercheVoyage = async (req, res) => {
    const { dateVoyage, arretDepart, arretArrive } = req.body
    const voyageExiste = await Voyage.find({ dateVoyage, "arretligne.nom_arret": { $all: [arretDepart, arretArrive] } })
    if (voyageExiste.length == 0) {
        const voyageExiste = await Voyage.find({ "arretligne.nom_arret": { $all: [arretDepart, arretArrive] } })
        var listeVoyage = [];
        var id
        var nomLigne
        var dateDeVoyage
        var Nbrtickets
        var numBus
        var arretDeDepart
        var arretDeArrive
        var heurDepart
        var heurArrive
        var distance
        var prix
        var arrets
        var duree
        var nameagency
        var imagePath
        var h1
        var m1
        var h2
        var m1
        var h
        var m
        for (var i = 0; i < 1; i++) {
            const indexDepart = voyageExiste[0].arretligne.findIndex(object => {
                return object.nom_arret == arretDepart;

            });
            const indexArrive = voyageExiste[0].arretligne.findIndex(object => {
                return object.nom_arret == arretArrive;

            });

            id = voyageExiste[0]._id
            nomLigne = voyageExiste[0].nom_ligne
            dateDeVoyage = req.body.dateVoyage
            Nbrtickets = 0
            numBus = voyageExiste[0].num_bus
            nameagency = voyageExiste[0].nameagency
            imagePath = voyageExiste[0].imagePath
            arretDeDepart = arretDepart
            arretDeArrive = arretArrive


            // si aller
            if (indexDepart < indexArrive) {
                console.log("aller");
                const eleDep = voyageExiste[0].arretligne[indexDepart]
                if (eleDep.heure_depart != "") {
                    console.log("heur depar " + eleDep.heure_depart);
                    heurDepart = eleDep.heure_depart
                }
                else {
                    console.log("heur depar " + eleDep.heure_arrive)
                    heurDepart = eleDep.heure_arrive
                }


                const eleArr = voyageExiste[0].arretligne[indexArrive]
                if (eleArr.heure_depart != "") {
                    console.log("heur arrive " + eleArr.heure_depart);
                    heurArrive = eleArr.heure_depart
                } else {
                    console.log("heur arrive " + eleArr.heure_arrive)
                    heurArrive = eleArr.heure_arrive
                }
                //calcul distance
                distanceDepart = parseInt(eleArr.distance.replace(' ', '').replace('km', ''));
                distancAarrive = parseInt(eleDep.distance.replace(' ', '').replace('km', ''));
                distanceTotal = Math.abs(distancAarrive - distanceDepart)
                console.log("distance totale  " + distanceTotal)
                distance = distanceTotal
                //calcul prix
                prixDepart = parseInt(eleArr.prix.replace(' ', '').replace('dt', ''));
                prixAarrive = parseInt(eleDep.prix.replace(' ', '').replace('dt', ''));
                if (prixDepart == prixAarrive) {
                    console.log("prix totale  " + prixDepart)
                    prix = prixDepart
                }
                else {
                    prixTotal = Math.abs(prixDepart - prixAarrive)
                    console.log("prix totale  " + prixTotal)
                    prix = prixTotal
                }
                // tableus des arrets entre 2 arret
                console.log(voyageExiste[i].arretligne.slice(indexDepart, indexArrive + 1));
                arrets = voyageExiste[0].arretligne.slice(indexDepart, indexArrive + 1)
            } else {
                // si retour
                console.log("retour");
                const eleArrr = voyageExiste[0].arretligne[indexDepart]
                if (eleArrr.heure_depart_retour != "") {
                    console.log("heur depar " + eleArrr.heure_depart_retour);
                    heurDepart = eleArrr.heure_depart_retour
                }
                else {
                    console.log("heur depar " + eleArrr.heure_depart_arrive)
                    heurDepart = eleArrr.heure_depart_arrive
                }

                const eleArrdep = voyageExiste[0].arretligne[indexArrive]
                if (eleArrdep.heure_depart_retour != "") {
                    console.log("heur arrive " + eleArrdep.heure_depart_retour);
                    heurArrive = eleArrdep.heure_depart_retour
                } else {
                    console.log("heur arrive " + eleArrdep.heure_depart_arrive)
                    heurArrive = eleArrdep.heure_depart_arrive
                }
                //calcul distance
                distanceDepart = parseInt(eleArrr.distance.replace(' ', '').replace('km', ''));
                distancAarrive = parseInt(eleArrdep.distance.replace(' ', '').replace('km', ''));
                distanceTotal = Math.abs(distancAarrive - distanceDepart)
                console.log("distance totale  " + distanceTotal)
                distance = distanceTotal
                //calcul prix
                prixDepart = parseInt(eleArrr.prix.replace(' ', '').replace('dt', ''));
                prixAarrive = parseInt(eleArrdep.prix.replace(' ', '').replace('dt', ''));
                if (prixDepart == prixAarrive) {
                    console.log("prix totale  " + prixDepart)
                    prix = prixDepart
                } else {
                    prixTotal = Math.abs(prixDepart - prixAarrive)
                    console.log("prix totale  " + prixTotal)
                    prix = prixTotal
                }
                // tableus des arrets entre 2 arret
                console.log("//////////////////");
                console.log((voyageExiste[0].arretligne.slice(indexArrive, indexDepart + 1)).reverse());
                console.log("//////////////////");
                arrets = (voyageExiste[0].arretligne.slice(indexArrive, indexDepart + 1)).reverse()

            }
            ///////////

            h1 = parseInt(heurDepart.substring(0, 2))
            m1 = parseInt(heurDepart.substring(3))
            h2 = parseInt(heurArrive.substring(0, 2))
            m2 = parseInt(heurArrive.substring(3))

            if (h2 - h1 <= 0) {
                h = (h2 - h1) + 24
            } else {
                h = h2 - h1
            }

            if (m2 - m1 < 0) {
                m = (m2 - m1) + 60
                if (m == 60) {
                    h += 1
                    m = 0
                }
            } else {
                m = m2 - m1
            }
            var duree = h + "H" + m + "Min"
            console.log(duree)

            //////////

            const voyageFound = new Voyagee(
                id,
                nomLigne,
                dateDeVoyage,
                Nbrtickets,
                numBus,
                arretDeDepart,
                arretDeArrive,
                heurDepart,
                heurArrive,
                distance,
                prix,
                arrets,
                duree,
                nameagency,
                imagePath

            )
            listeVoyage.push(voyageFound)
            console.log("///////voyage from classe///////////");
            console.log(voyageFound);
            console.log("///////voyage from classe///////////");

        }
        console.log("listeVoyage" + listeVoyage);

        //  res.status(200).json(voyageExiste)
        res.status(200).json(listeVoyage)

    }
    else {
        var listeVoyage = [];
        var id
        var nomLigne
        var dateDeVoyage
        var Nbrtickets
        var numBus
        var arretDeDepart
        var arretDeArrive
        var heurDepart
        var heurArrive
        var distance
        var prix
        var arrets
        var duree
        var nameagency
        var imagePath
        var h1
        var m1
        var h2
        var m1
        var h
        var m
        for (var i = 0; i < voyageExiste.length; i++) {
            const indexDepart = voyageExiste[i].arretligne.findIndex(object => {
                return object.nom_arret == arretDepart;

            });
            const indexArrive = voyageExiste[i].arretligne.findIndex(object => {
                return object.nom_arret == arretArrive;

            });

            id = voyageExiste[i]._id
            nomLigne = voyageExiste[i].nom_ligne
            dateDeVoyage = voyageExiste[i].dateVoyage
            Nbrtickets = voyageExiste[i].Nbrtickets
            numBus = voyageExiste[i].num_bus
            nameagency = voyageExiste[i].nameagency
            imagePath = voyageExiste[i].imagePath
            arretDeDepart = arretDepart
            arretDeArrive = arretArrive


            // si aller
            if (indexDepart < indexArrive) {
                console.log("aller");
                const eleDep = voyageExiste[i].arretligne[indexDepart]
                if (eleDep.heure_depart != "") {
                    console.log("heur depar " + eleDep.heure_depart);
                    heurDepart = eleDep.heure_depart
                }
                else {
                    console.log("heur depar " + eleDep.heure_arrive)
                    heurDepart = eleDep.heure_arrive
                }


                const eleArr = voyageExiste[i].arretligne[indexArrive]
                if (eleArr.heure_depart != "") {
                    console.log("heur arrive " + eleArr.heure_depart);
                    heurArrive = eleArr.heure_depart
                } else {
                    console.log("heur arrive " + eleArr.heure_arrive)
                    heurArrive = eleArr.heure_arrive
                }
                //calcul distance
                distanceDepart = parseInt(eleArr.distance.replace(' ', '').replace('km', ''));
                distancAarrive = parseInt(eleDep.distance.replace(' ', '').replace('km', ''));
                distanceTotal = Math.abs(distancAarrive - distanceDepart)
                console.log("distance totale  " + distanceTotal)
                distance = distanceTotal
                //calcul prix
                prixDepart = parseInt(eleArr.prix.replace(' ', '').replace('dt', ''));
                prixAarrive = parseInt(eleDep.prix.replace(' ', '').replace('dt', ''));
                if (prixDepart == prixAarrive) {
                    console.log("prix totale  " + prixDepart)
                    prix = prixDepart
                }
                else {
                    prixTotal = Math.abs(prixDepart - prixAarrive)
                    console.log("prix totale  " + prixTotal)
                    prix = prixTotal
                }
                // tableus des arrets entre 2 arret
                console.log(voyageExiste[i].arretligne.slice(indexDepart, indexArrive + 1));
                arrets = voyageExiste[i].arretligne.slice(indexDepart, indexArrive + 1)
            } else {
                // si retour
                console.log("retour");
                const eleArrr = voyageExiste[i].arretligne[indexDepart]
                if (eleArrr.heure_depart_retour != "") {
                    console.log("heur depar " + eleArrr.heure_depart_retour);
                    heurDepart = eleArrr.heure_depart_retour
                }
                else {
                    console.log("heur depar " + eleArrr.heure_depart_arrive)
                    heurDepart = eleArrr.heure_depart_arrive
                }

                const eleArrdep = voyageExiste[i].arretligne[indexArrive]
                if (eleArrdep.heure_depart_retour != "") {
                    console.log("heur arrive " + eleArrdep.heure_depart_retour);
                    heurArrive = eleArrdep.heure_depart_retour
                } else {
                    console.log("heur arrive " + eleArrdep.heure_depart_arrive)
                    heurArrive = eleArrdep.heure_depart_arrive
                }
                //calcul distance
                distanceDepart = parseInt(eleArrr.distance.replace(' ', '').replace('km', ''));
                distancAarrive = parseInt(eleArrdep.distance.replace(' ', '').replace('km', ''));
                distanceTotal = Math.abs(distancAarrive - distanceDepart)
                console.log("distance totale  " + distanceTotal)
                distance = distanceTotal
                //calcul prix
                prixDepart = parseInt(eleArrr.prix.replace(' ', '').replace('dt', ''));
                prixAarrive = parseInt(eleArrdep.prix.replace(' ', '').replace('dt', ''));
                if (prixDepart == prixAarrive) {
                    console.log("prix totale  " + prixDepart)
                    prix = prixDepart
                } else {
                    prixTotal = Math.abs(prixDepart - prixAarrive)
                    console.log("prix totale  " + prixTotal)
                    prix = prixTotal
                }
                // tableus des arrets entre 2 arret
                console.log((voyageExiste[i].arretligne.slice(indexArrive, indexDepart + 1)).reverse());
                arrets = (voyageExiste[i].arretligne.slice(indexArrive, indexDepart + 1)).reverse()

            }
            ///////////

            h1 = parseInt(heurDepart.substring(0, 2))
            m1 = parseInt(heurDepart.substring(3))
            h2 = parseInt(heurArrive.substring(0, 2))
            m2 = parseInt(heurArrive.substring(3))

            if (h2 - h1 <= 0) {
                h = (h2 - h1) + 24
            } else {
                h = h2 - h1
            }

            if (m2 - m1 < 0) {
                m = (m2 - m1) + 60
                if (m == 60) {
                    h += 1
                    m = 0
                }
            } else {
                m = m2 - m1
            }
            var duree = h + "H" + m + "Min"
            console.log(duree)

            //////////

            const voyageFound = new Voyagee(
                id,
                nomLigne,
                dateDeVoyage,
                Nbrtickets,
                numBus,
                arretDeDepart,
                arretDeArrive,
                heurDepart,
                heurArrive,
                distance,
                prix,
                arrets,
                duree,
                nameagency,
                imagePath

            )
            listeVoyage.push(voyageFound)
            console.log(voyageFound);

        }

        //  res.status(200).json(voyageExiste)
        res.status(200).json(listeVoyage)
    }
}


exports.getDetailleTicketByid = async (req, res) => {
    try {
        const detailsTickcet = await Voyage.findById(req.params.id)

        res.status(200).json(detailsTickcet)
    }
    catch (err) {
        res.status(500).json(err)
    }
}





exports.repondreContact = async (req, res) => {
    try {
        const status = 'Active'
        const RepContact = {
            email_User: req.body.email_User,
            texteRep: req.body.texteRep,
            status
        }

        const user = await Contact.findByIdAndUpdate(req.params.id, RepContact, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        await sendEmail({
            email: RepContact.email_User,
            subject: 'MalaBus Contact',
            message: RepContact.texteRep
        })
    }
    catch (e) {
        console.log(e.message)
    }
}

function calcNbReservedplace(arr) {
    let res = 0;

    for (let i = 0; i < arr.length; i++) {

        res = res + arr[i]["nbPlace"];
    }

    return res.toString();

}
exports.Testnbticket = async (req, res) => {
    await Reservation.find({
        $and: [{ dateVoyage: req.body.dateVoyage }, { nomLigne: req.body.nomLigne }, { nameagency: req.body.nameagency }]
    }, { _id: 1, nbPlace: 1 }).then(responce => {
        let result = calcNbReservedplace(responce)
        res.json({
            code: 200,
            result: result,
        })
    }).catch(err => {
        console.log(err);
        res.json({
            code: 400,
            result: err
        })
    })






    exports.buildPDF = (dataCallback, endCallback) => {
        const doc = new PDFDocument({ bufferPages: true, font: 'Courier' });

        doc.on('data', dataCallback);
        doc.on('end', endCallback);

        doc.fontSize(20).text(`A heading`);

        doc
            .fontSize(12)
            .text(
                `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, saepe.`
            );
        doc.end();
    }






}

