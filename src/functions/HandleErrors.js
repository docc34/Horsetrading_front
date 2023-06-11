//Vanha validaatio metodi
const HandleErrors = (o)=>{
    
    if(o === null || o === undefined || o?.status === "Error" || o?.status > 399){

        var message = "";
        if(o?.message != null)
            message ="An error happened: "+  o?.message
        else{
            message ="An error happened: "+ o?.title;
        }
        return {valid: false, message: message};
    }
    else { // if(result?.status === "Ok")
       
        return {valid: true, message: ""};
    }
}

export {HandleErrors}