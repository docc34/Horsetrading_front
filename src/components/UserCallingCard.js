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
                <Image className='callingCardImage' src="https://huutokauppstorage.blob.core.windows.net/huutokauppaimages/AirBrush_2235232937.jpg" roundedCircle  />
            </div>
            <div>
                <h1>{data?.user?.companyName}</h1>
            </div>
        </Link>
    </div>)
}

export{UserCallingCard}