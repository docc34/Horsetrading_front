import './UserContainer.css';
import {Link} from 'react-router-dom';
import { UserCallingCard } from './UserCallingCard';
import { CardGroup } from 'react-bootstrap';
import { StoreCell } from './StoreCell';

const UserContainer = (data)=>{

    const UserHeader = () => {
        var url = "/user?userId="+data?.user?.id;
        return (
            <div className='userCellLinkDiv'>
                <div>
                    <Link to={url} className='userCellLink'>
                        <h1>{data?.user?.companyName}</h1>
                        <p className='userCellDescription'>{data?.user?.shortDescription}</p>
                    </Link>
                <hr className='userCellHr'/>
                </div>
            </div>
            
        )
    }

    return(
        <div>
            {/* <div className='user-cell'> */}
                {/* <UserHeader /> */}
                {data.user.userAuctionItems != null?
                    <CardGroup>
                        {data.user.userAuctionItems.map((item, i) => {
                            return(
                                <div key={i}>
                                    <UserCallingCard user={data?.user}/>
                                    <StoreCell data={item} />
                                </div>
                            )
                        })}
                    </CardGroup>
                : null}
            {/* </div> */}
        </div>
    )
}

export {UserContainer}