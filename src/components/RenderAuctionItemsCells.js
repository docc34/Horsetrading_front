import { CardGroup } from 'react-bootstrap';
import { StoreCell } from './StoreCell';

//Renderöidään käyttäjän auctionitemit
const RenderAuctionItemsCells = (cellData) => {
    if(cellData?.auctionItems != null){
        return(
            <CardGroup>
                {cellData.auctionItems.map((item, i) => {
                    
                    return(
                        <div key={i}>
                            <StoreCell data={item} />
                        </div>
                    )
                })}
            </CardGroup>
        )
    }
    else{
        return null
    }
    
}

export {RenderAuctionItemsCells}