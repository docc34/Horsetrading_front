import './UserContainer.css';
import {RenderAuctionItemsCells} from './RenderAuctionItemsCells';

const UserContainer = (data)=>{
    //Data palautuu nyt järkevämmin apista, palauttaa käyttäjän jonka alla palauttaa listassa käyttäjän auctionitemit.


    const UserHeader = () => {
        return (
            <div className='userCellLinkDiv'>
                {   (data.page === 'home') ?
                    <div>
                        <a href={"/user?userId="+data?.user?.id} className='userCellLink'>
                            <h1>{data?.user?.companyName}</h1>
                        </a>
                    </div>
                    :
                    <div>
                        <a href={"/user?userId="+data?.user?.id} className='userCellLink'>
                            <h1>{data?.user?.companyName}</h1>
                            <p>{data.user.description}</p>  
                        </a>
                    </div>

                }
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