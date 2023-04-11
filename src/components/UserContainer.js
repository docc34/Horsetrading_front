import './UserContainer.css';
import { CardGroup } from 'react-bootstrap';
import { StoreCell } from './StoreCell';

const UserContainer = (data)=>{
    //Data palautuu nyt järkevämmin apista, palauttaa käyttäjän jonka alla palauttaa listassa käyttäjän auctionitemit.

    //Renderöidään käyttäjän auctionitemit
    const RenderAuctionItemsCells = (cellData) => {
        return(
            <CardGroup>
                {cellData.auctionItems.map((item) => {
                    console.log(item);
                    return(
                        <div>
                            <StoreCell data={item} />
                        </div>
                    )
                })}
            </CardGroup>
        )
    }

    return(
        <div>
            <div className='user-cell'>
                <div className='userCellLinkDiv'>
                    <a href={"/user?userId="+data?.user?.id} className='userCellLink'>
                        <h1>{data?.user?.companyName}</h1>
                        <p>{data.user.description}</p>  
                    </a>
                </div>
                <div>
                    <RenderAuctionItemsCells auctionItems={data.user.userAuctionItems} /> 
                </div>
            </div>
        </div>
    )
}

export {UserContainer}