import {Link} from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import './UserCallingCard.css';

const UserCallingCard = (data)=>{

    var url = "/user?userId="+data?.user?.id;
    
    //This is the sellers callingcard used in auction and home page cell
    return(<div>
        <Link to={url} className='callingCardMainDiv'>
            <div>
                {/* <img src={data?.user?.profilePicUrl}/>     */}
                <Image className='callingCardImage' src={data?.user?.profilePicUrl != null && data?.user?.profilePicUrl != "" ? data?.user?.profilePicUrl : "https://huutokauppstorage.blob.core.windows.net/huutokauppaimages/DefaultPro230035042.png"} roundedCircle  />
            </div>
            <div className='callingCardTextDiv'>
                <h1>{data?.user?.companyName}</h1>
                <p>{data?.user?.shortDescription}</p>
            </div>
        </Link>
    </div>)
}

export{UserCallingCard}