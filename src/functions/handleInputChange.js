//Vanha validaatio metodi
const handleInputChange = (o)=>{
    if(o.target.value == null  || o.target.value == ""|| o.target.value == 0){
        o.target.setAttribute('style','border-color: red; border-width: 2px')
        return null;
    }
    else{
        o.target.setAttribute('style','')
        return o.target.value;
    }
}

export {handleInputChange}