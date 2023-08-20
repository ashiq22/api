export class Voyageur {
    _id: number;
    fname: String ;
    lname: String ;
    username: String ;
    birthday: Date ;
    phoneNum: String ;
    email: String ;
    password: String ;
    job: String ;
    civility: String;
    address: String;
    postalCode: String;
    city: String;
    country: String;

    constructor(voyageur : any){
       {
           this._id = voyageur._id
           this.fname = voyageur.fname || "" ;
           this.lname = voyageur.lname || "" ;
           this.username = voyageur.username || "" ;
           this.birthday = voyageur.birthday || null;
           this.phoneNum = voyageur.phoneNum || "" ;
           this.email = voyageur.email || "" ;
           this.password = voyageur.password || "" ;
           this.job = voyageur.job || "" ;
           this.civility = voyageur.civility || "" ;
           this.address = voyageur.address || "" ;
           this.postalCode = voyageur.postalCode || "" ;
           this.city = voyageur.city || "" ;
           this.country = voyageur.country || "" ;
       }
    }
}


