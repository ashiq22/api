const Agency = require('../models/agency.models')
const Station = require('../models/station.models')
const Reservation = require('../models/reservation.models')
const Voyage = require('../models/voyage.models')
const Ligne = require('../models/ligne.models')
const Arret = require('../models/arret.models')
const Infoligne = require('../models/info-ligne.models')
const sendToken = require('../utils/JWT_Tokenagency');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')

//register agency
exports.registerAgency = async (req, res,next) => {
    try{
    const { nameagency,
        matricule,
        email,
        num_cnss,
        business_sector,
        telAgence,
        telpesContact,
        nompersonneContact,
        prenomersonneContact,
        adressAgencce,
        postalCodeagence,
        villeAgence,
        legal_status } = req.body;

    const agency = await Agency.create({
        nameagency,
        matricule,
        email,
        num_cnss,
        business_sector,
       legal_status,
       telAgence,
       telpesContact,
       nompersonneContact,
       prenomersonneContact,
       adressAgencce,
       postalCodeagence,
       villeAgence
    })    
    res.status(200).json({
        success: true,
        message: `Your account has been added successfully You must wait for the acceptance by the administrator`,
        return : agency
    }
    )
}catch(e){
    console.log(e.message)
    return res.status(400).json({ "error":e.message.replace(/nameagency:|Agency validation failed:|matricule:|email:|num_cnss:|business_sector:|legal_status:/,'') });
     }  
}
//login agency
exports.loginAgency = async (req, res, next) => {
    const password = req.body.password
    const credentels = req.body.credentels;
     var agency;
    //verfy name and password agency
    if (!credentels || !password) {
        return res.status(404).send("Veuillez entrer votre nom d'utilisateur ou email et votre mot de passe")    

    }
    if (credentels.indexOf('@') === -1) {
        agency = await Agency.findOne({ nameagency:credentels }).select('+password')
       if (!agency) {
        return res.status(404).send("Username ou Email incorrect")
    }
   }else{
    agency = await Agency.findOne({ email:credentels }).select('+password')
       if (!agency) {
        return res.status(404).send("Email ou username incorrect")
    }
   }
    //verify account is actif or not
    if(agency.verified == false){
        return res.status(404).send("Vous n'avez pas encore verifier")
    }
    const ipasswordMatched = await agency.comparePassword(password);
    if (!ipasswordMatched) {
        return res.status(404).send("Mot de passe incorrect")
    }
    sendToken(agency, 200, res)
}
//Forget password

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const agence = await Agency.findOne({ email: req.body.email });
    if (!agence) {
        return res.status(404).send(
            "email incorrect"
        )
    }
    const resetToken = agence.getResetPasswordToken();
    await agence.save({ validateBeforeSave: false });
    const resetUrl = `https://malabus.net/forgetpasswordagence/resetPasswordagence?token=${resetToken}`

    const message =
        `Vous nous avez demandé de réinitialiser votre mot de passe oublié.
             Pour terminer le processus, veuillez cliquer sur le lien ci-dessous:\n\n${resetUrl}\n\n`
    try {
         await sendEmail({
            email: agence.email,
            subject: 'MalaBus password ',
            message
        })
        res.status(200).json({
            success: true,
            message:`Email sent to: ${agence.email}`
        })
    } catch (error) {
        agence.resetPasswordToken = undefined;
        agence.resetPasswordExpire = undefined;
        await agence.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
})




//Reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const agence = await Agency.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    /*
    if (!agence) {
        return res.status(400).send("agence incorecte")
    }
    */
    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).send("Les mots de passe ne correspondent pas")
    }
    // Setup new password
    agence.password = req.body.password;
    agence.resetPasswordToken = undefined;
    agence.resetPasswordExpire = undefined;
    await agence.save();
    sendToken(agence, 200, res)
})
//loged agency
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
//find agency by id
exports.getAgencyProfil= async(req,res)=>{
    try {
    const agency = await Agency.findById(req.params.id)
    res.status(200).json(agency)
} 
catch (err) {
    res.status(500).json(err)
  }
}
// Update agency profile 
exports.updateProfile = catchAsyncErrors(async (req, res) => {
        if(req.file != undefined){
            newAgency = {


        nameagency: req.body.nameagency,
        email: req.body.email,
        num_cnss : req.body.num_cnss,
        business_sector:req.body.business_sector,
        legal_status:req.body.legal_status,
        telAgence:req.body.telAgence,
        villeAgence:req.body.villeAgence,
        telpesContact:req.body.telpesContact,
        nompersonneContact:req.body.nompersonneContact,
        prenomersonneContact:req.body.prenomersonneContact,
        adressAgencce:req.body.adressAgencce,
        imagePath :  'https://malabuss.herokuapp.com/images/' + req.file.filename 

    }
 }else {
     newAgency = {
        nameagency: req.body.nameagency,
        email: req.body.email,
        num_cnss : req.body.num_cnss,
        business_sector:req.body.business_sector,
        legal_status:req.body.legal_status,
        telAgence:req.body.telAgence,
        villeAgence:req.body.villeAgence,
        telpesContact:req.body.telpesContact,
        nompersonneContact:req.body.nompersonneContact,
        prenomersonneContact:req.body.prenomersonneContact,
        adressAgencce:req.body.adressAgencce,

    }
 }
    const agency = await Agency.findByIdAndUpdate(req.params.id, newAgency, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    sendToken(agency, 200, res)
})
// liste reservation
exports.getReservation= async(req,res)=>{
    try {
    const reservationList = await Reservation.find()
    res.status(200).json(reservationList)
}
catch (err) {
    res.status(500).json(err)
  }
}
// liste voyage
exports.getAllvoyage= async(req,res)=>{
    try {
    const voyageList = await Voyage.find()
    res.status(200).json(voyageList)
}
catch (err) {
    res.status(500).json(err)
  }
}
//ajout voyage
exports.ajoutVoyage = async (req , res  )=>{
    try{
        const {
            nomAgence,ligne , datettst , heureDepart ,heureDep, minDep, heureArrive, durée ,prix , nbPlaces , escale ,type_voyage, distance 
        }= req.body ;
      
        const dateVoyage = new Date(datettst).setUTCHours(heureDep , minDep)
        const logoAgence = await Agency.find({nameagency : req.body.nomAgence} , {imagePath:1 })
        const lignArret  = await Station.find({ligne : req.body.ligne} , {arret:1 , _id:0 })
        //voyage de type aller
        if(type_voyage == "Aller"){
            const arret = lignArret[0].arret
            const imagePath = logoAgence[0].imagePath
            const voyage = await Voyage.create ({
                nomAgence,ligne, arret ,escale,imagePath, dateVoyage  , heureDepart , heureArrive,durée, prix , nbPlaces , type_voyage , distance
            })
            res.send({
                message : "votre voyage ajouter avec succées ",
                voyage 
            })
        }
        //voyage de type retour
        else{
            const arret = lignArret[0].arret.reverse()
            const voyage = await Voyage.create ({
                nomAgence,ligne, arret , escale, dateVoyage , heureDepart , heureArrive,durée, prix , nbPlaces , type_voyage
            })
            res.send({
                message : "votre voyage ajouter avec succées ",
                voyage 
            })
        }
     
    }
   
    catch (e){
        console.log(e.message)
    }
}
//liste voyage 
exports.listeVoyage = async (req, res) => {
    const {nomAgence} = req.body
    const voyage = await Voyage.find({nomAgence})
    res.status(200).json(voyage)
}
// modifier voyage
exports.updateVoyage = async (req , res) => {
    const newVoyage = {
        ligne : req.body.ligne ,
        villeArriver : req.body.villeArriver,
        dateVoyage : req.body.dateVoyage,
        heureDepart : req.body.heureDepart,
        heureArrive : req.body.heureArrive ,
        durée : req.body.durée,
        prix : req.body.prix,
        nbPlaces : req.body.nbPlaces,
        escale : req.body.escale,
        distance : req.body.distance
    }
    const voyage = await Voyage.findByIdAndUpdate(req.params.id, newVoyage, {
        new: true,
    })
    const emailVoyageur = await Reservation.find(req.params.id_Voyage).select('email_User')
    if(emailVoyageur.length != 0){
        const message =
        `Votre voyage a été modifier par l'agence`
         sendEmail({
            email: emailVoyageur,
            subject: 'Notification de modification voyage',
            message
        })
          res.status(200).json({
            success: true,
            message: `Email sent to: ${emailVoyageur}`,
            voyage : voyage
        })
    }
    else{
        res.status(200).json({
            success: true,
            voyage : voyage
        })
    }
 

}
/*
// annuler voyage
exports.annulerVoyage = async (req, res) => {
    const voyage = await Voyage.findByIdAndDelete(req.params.id)
    const emailVoyageur = await Reservation.find(req.params.id_Voyage).select('email_User')
  if(emailVoyageur.length !=0){
    const message =
    `Votre reservation du voyage a été annuler merci de rechercher un autre voyage  `
    await sendEmail({
        email: emailVoyageur,
        subject: 'Annulation du voyage',
        message
    })
    res.status(200).json({
        success: true,
        message: `Email sent to: ${emailVoyageur}`,
        voyage : voyage
    })
  }
  else{
    res.status(401).json({
        success: false
    })
  }
}
*/

//Update image profile
exports.updateProfileImage = catchAsyncErrors(async (req, res) => {
    const newImage = {
        imagePath : 'https://malabus.net/images/' + req.file.filename
    }
    const user = await Agency.findByIdAndUpdate(req.params.id, newImage, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    return res.status(201).json('Logo ajouter')
})

/**Sprint ligne */
//create-ligne
exports.ajouterLigne = async (req, res) => {
    var regExpLigne = /([A-Z]|[a-z])(-)([A-Z]|[a-z])/;
    const { nom_ligne } = req.body;
    if (nom_ligne.length==0){
        return res.status(404).json("nom arret est obligatoire")
    }
    var testReg = regExpLigne.test(nom_ligne)
    if (testReg == true){
        var exist_ligne ;
        exist_ligne = await Ligne.find({nom_ligne})
        if(exist_ligne.length == 0 ){
            const nomLigne = await Ligne.create({
                nom_ligne
            })    
             res.status(200).json({
                success: true,
                message: `ligne ajouter`,
                return : nomLigne
            }
            )
        }
        else {
            return res.status(404).json("Ligne déja existe")
        }
    }
    else{
        return res.status(404).json("Mauvais format devriez écrire comme ceci Stop1--Stop2")}
  
    
}
//create arret
exports.ajouterArret = async (req, res,next) => {
    var regExparret = /([A-Z])/;
    const { nom_arret , longitude , latitude , duree_arret } = req.body;
    var testReg = regExparret.test(nom_arret)
    if (testReg == false){
        return res.status(404).json("Nom arret doit étre majuscule")
    }

    if (nom_arret.length==0){
        return res.status(404).json("Nom arret est obligatoire")
    }
   
    var exist_arret ;
    exist_arret = await Arret.find({nom_arret})
    if(exist_arret.length == 0 ){
        const nomArret = await Arret.create({
            nom_arret , longitude , latitude , duree_arret
        })    
          res.status(200).json({
            success: true,
            message: `arret ajouter`,
            return : nomArret
        }
        )
    }
    else {
   
        return res.status(404).json("arret déja existe")
    } 
    
}

//getLigne 
exports.getAllLigne = async (req , res ) => {
    try {
        const ligneList = await Ligne.find()
        res.status(200).json(ligneList)
    }
    catch (err) {
        res.status(500).json(err)
      }
}
//getArret 
exports.getAllArret = async (req , res ) => {
    try {
        const arretList = await Arret.find()
                res.status(200).json(arretList)
    }
    catch (err) {
        res.status(500).json(err)
      }
}

//create information ligne 
exports.ajouterInfoLigne = async (req, res,next) => { 
    const info_arret ={ 
         nom_ligne , arretligne   , prix , distance , type_distance ,
         unite_prix,
        num_bus, duree , nbr_place
     } = req.body.data;
     if (nom_ligne.length==0){
        return res.status(404).json("Vous devez sélectionner une ligne")
    }
    if (prix.length==0){
        return res.status(404).json("Prix de ligne est obligatoire")
    }
    if (distance.length==0){
        return res.status(404).json("Saisi de la distance est obligatoire")
    }
    if (type_distance.length==0){
        return res.status(404).json("La distance est manquant leur type")
    }
    if (num_bus.length==0){
        return res.status(404).json("Numéro de bus est obligatoire")
    }
    if (duree.length==0){
        return res.status(404).json("Duré de la ligne est obligatoire")
    }
        const infoLigne = await Infoligne.create({
            id_agence: req.params.id_agence, nom_ligne , arretligne: req.body.arretligne   ,
             prix :prix.concat(' ', unite_prix), unite_prix,
            distance: distance.concat(' ', type_distance),type_distance,
            num_bus, duree , nbr_place
        })    
         res.status(200).json({
            success: true,
            message: `infoLigne ajouter`,
            return : infoLigne
        }
        )
        
}
//getAllinfoligne
exports.getAllInfoLigne = async (req , res ) => {
    try {
        const infoligne = await Infoligne.find()
        res.status(200).json(infoligne)
    }
    catch (err) {
        res.status(500).json(err)
      }
}

//modifierInfoligne
exports.updateInfoLigne = catchAsyncErrors(async (req, res) => {
    const newInfoLigne = {
        nom_ligne: req.body.nom_ligne,
        arretligne : req.body.arretligne,
        heur_dep:req.body.heur_dep,
        heur_arriv:req.body.heur_arriv,
        prix:req.body.prix,
        distance:req.body.distance,
        num_bus:req.body.num_bus,
        duree:req.body.duree,
        nbr_place:req.body.nbr_place,
    }
    const infoLigneupdate = await Infoligne.findByIdAndUpdate(req.params.id, newInfoLigne, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        message: `infoLigne modifer`,
        return : infoLigneupdate
    }
    )
})

//supprimerInfoligne
exports.deleteInfoligne= async(req,res)=>{
    try {
        const infoligne = await Infoligne.findById(req.params.id);
        !infoligne && res.status(404).json("ligne not found");
        await infoligne.deleteOne();
        res.status(200).json("info ligne supprimé");
} 
catch (err) {
    res.status(500).json(err)
  }
}

//getarretparID
exports.findarretById = async (req, res, next) => {
    const arret = await Arret.findById(req.params.id)
    return res.status(200).json(arret)
}

//getAllligneparID
exports.findallligneById = async (req, res, next) => {
    const id_agence = req.params.id_agence
    const ligneInfobyid = await Infoligne.find({id_agence : id_agence})
    return res.status(200).json(ligneInfobyid)
}


//ajoutDatenbrTicketsvoyage
exports.addDateNbrticketVoyage = async (req , res) => {

    const { dateVoyage ,Nbrtickets } = req.body.data;
    const voyageDateTickets = await Voyage.create({
        nameagency:req.body.nameagency,
        id_agence:req.body.id_agence,
        imagePath:req.body.imagePath,
        idInfoligne: req.body.idInfoligne , dateVoyage , Nbrtickets ,nom_ligne : req.body.nom_ligne ,
        num_bus : req.body.num_bus , arretligne : req.body.arretligne,
        Nbrticketstotale: Nbrtickets
    })    
     res.status(200).json({
        success: true,
        message: `Date et nombre de tickets ajouter`,
        return : voyageDateTickets
    }
    )

}
exports.getAllDateTicket = async (req , res ) => {
    try {
        const id_agence = req.params.id_agence

        const infoVoyage = await Voyage.find({id_agence : id_agence})
        res.status(200).json(infoVoyage)
    }
    catch (err) {
        res.status(500).json(err)
      }
}

//get all reservation
exports.getHistorique= async(req,res)=>{
    try {
    const nameagency = req.params.nameagency
    const reservation = await Reservation.find({nameagency : nameagency})
    res.status(200).json(reservation)
} 
catch (err) {
    res.status(500).json(err)
  }
}



function calcNbReservedplace(arr){
    let res=0;
    for(let i=0;i<arr.length;i++){

        res=res+arr[i]["nbPlace"];
    }
    return res.toString();
}



nbTicketForStat =(voyage)=>{
    let arrayNbTicket=[];
    for(let i=0;i<voyage.length;i++){
        let resp={
            ligne:voyage[i].nom_ligne,
            date_voyage:voyage[i].dateVoyage,
            nbticketvondue:voyage[i].Nbrticketstotale-voyage[i].Nbrtickets,
         }
        arrayNbTicket.push(resp);
    }
     return arrayNbTicket;

}

exports.nbTicketvonduebyagence= async(req,res)=>{
    const nameagency = req.params.nameagency
Voyage.find({nameagency : nameagency}).then(voyage=>{
    let nbTicketForStatic=nbTicketForStat(voyage);
    res.status(200).json(nbTicketForStatic)
}).catch(err=>{
    console.log('err==>',err);
    res.send('error =>',err);
})

 
    }
    
