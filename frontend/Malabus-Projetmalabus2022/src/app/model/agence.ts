export class Agence {
    nameagency: String ;
    matricule: String ;
    email: String ;
    num_cnss: Date ;
    business_sector: String ;
    legal_status: String ;


    constructor(Agence : any){
        {
            this.nameagency = Agence.nameagency || "" ;
            this.matricule = Agence.matricule || "" ;
            this.num_cnss = Agence.num_cnss || "" ;
            this.business_sector = Agence.business_sector || "" ;
            this.email = Agence.email || "" ;
            this.legal_status = Agence.legal_status || "" ;
        }
     }

}
