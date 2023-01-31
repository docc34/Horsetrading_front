import './functions.css';
import Spinner from 'react-bootstrap/Spinner';
import { relativeTimeRounding } from 'moment';

const handleInputChange = (o)=>{
    if(o.target.value == null  || o.target.value == ""|| o.target.value == 0){
        o.target.setAttribute('style','border-color: #8f37aa; border-width: 2px')
        return null;
    }
    else{
        o.target.setAttribute('style','')
        return o.target.value;
    }
}

const MakeStoreCell = (d)=>{
    console.log(d);

    return(
        <div className="storeCellMainDiv">
            <div className='storeCellImgDiv'>
                <img src={d.data?.imageLink}/>
            </div>
            <div>
                <h4>{d.data?.title}</h4>
                <p>{d.data?.description}</p>
            </div>
        </div>
    )
}

export {handleInputChange, MakeStoreCell}