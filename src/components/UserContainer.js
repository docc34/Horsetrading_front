import './UserContainer.css';
import { CardGroup } from 'react-bootstrap';
import { StoreCell } from './StoreCell';

const UserContainer = (data)=>{
    //Data palautuu nyt järkevämmin apista, palauttaa käyttäjän jonka alla palauttaa listassa käyttäjän auctionitemit.

    //Renderöidään käyttäjän auctionitemit
    const RenderAuctionItemsCells = (cellData) => {
        return(
            <CardGroup>
                {cellData.auctionItems.map((item, i) => {
                    console.log(item);
                    return(
                        <div key={i}>
                            <StoreCell data={item} />
                        </div>
                    )
                })}
            </CardGroup>
        )
    }

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