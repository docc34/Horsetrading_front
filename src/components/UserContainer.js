import './UserContainer.css';
import {RenderAuctionItemsCells} from './RenderAuctionItemsCells';
import {Link} from 'react-router-dom';
import { UserCallingCard } from './UserCallingCard';

const UserContainer = (data)=>{
    //Data palautuu nyt järkevämmin apista, palauttaa käyttäjän jonka alla palauttaa listassa käyttäjän auctionitemit.

    const UserHeader = () => {
        var url = "/user?userId="+data?.user?.id;
        return (
            <div className='userCellLinkDiv'>
                <div>
                    <Link to={url} className='userCellLink'>
                        <h1>{data?.user?.companyName}</h1>
                        {data.page === 'home' ? 
                            <p className='userCellDescription'>{data?.user?.shortDescription}</p>
                            : 
                            <p>{data?.user?.description}</p>
                        }
                    </Link>
                <hr className='userCellHr'/>
                <UserCallingCard user={data?.user}/>
                </div>
            </div>
            
        )
    }

    return(
        <div>
            <div className='user-cell'>
                <UserHeader />
                <RenderAuctionItemsCells auctionItems={data.user.userAuctionItems} /> 
                
            </div>
        </div>
    )
}

export {UserContainer}