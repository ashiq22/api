import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {

    static patternValidator(): ValidatorFn {
        return (control: AbstractControl): {length : boolean , upperCase : boolean , lowerCase : boolean , num : boolean}=> {
            const value = control.value;
        if (!value) {
            return  {length : false , upperCase : false , lowerCase : false , num : false};
        }
        const validLength = value.length > 7 ;
        const hasUpperCase = /[A-Z]+/.test(value);
        const hasLowerCase = /[a-z]+/.test(value);
        const hasNumeric = /[0-9]+/.test(value);
        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && validLength;
        return !passwordValid ? {length:true , upperCase : true , lowerCase :true , num : true}:
         {length: validLength , upperCase : hasUpperCase , lowerCase :hasLowerCase , num : hasNumeric};
        };
    }


   static lengthValidator() : ValidatorFn {
       return (control : AbstractControl) : ValidationErrors | null => {
           const value = control.value;
           if (!value)
           {
               return null ;
           }
           const validLength = value.length > 7 ;
           return !validLength ? {length : true}:null;
       }
   }

   static UpperValidator() : ValidatorFn {
       return (control : AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        if (!value){
            return null ;
        }
        const hasUpperCase = /[A-Z]+/.test(value);
        return !hasUpperCase ? {test : true}: null

       }
   }

   static LowerValidator() : ValidatorFn {
    return (control : AbstractControl) : ValidationErrors | null => {
     const value = control.value;
     if (!value){
         return null ;
     }
     const hasLowerCase = /[a-z]+/.test(value);
     return !hasLowerCase ? {lower : true}: null
    }

}

static specialValidator() : ValidatorFn {
    return (control : AbstractControl) : ValidationErrors | null => {
     const value = control.value;
     if (!value){
         return null ;
     }
     const hasLowerCase = /(?=.*[ -\/:-@\[-\`{-~]{1,})/.test(value);
     return !hasLowerCase ? {special : true}: null
    }
}
static degitValidatror() : ValidatorFn {
    return (control : AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        if (!value){
            return null ;
        }
        const degit = /[0-9]{2}/.test(value);
        return !degit ? {num : true}: null
       }   
}

static matriculeValidatror() : ValidatorFn {
    return (control : AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        if (!value){
            return null ;
        }
        const degit = /^[0-9]{7}[A-Z]$/.test(value);
        return !degit ? {matr : true}: null
       }   
}


static nameagenceValidatror() : ValidatorFn {
    return (control : AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        if (!value)
        {
            return null ;
        }
        const validLength = value.length > 1 ;
        return !validLength ? {length : true}:null;
    }  
}

}
