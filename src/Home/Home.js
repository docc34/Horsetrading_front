import './Home.css';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import CardGroup from 'react-bootstrap/CardGroup';
import { UserContainer } from '../components/UserContainer';
import { useCookies } from 'react-cookie';
import { StoreCell } from '../components/StoreCell';

const Home = ()=>{
    const [cookies] = useCookies(["recentAuctionItems"]);
    const[containerData,setContainerData] = useState([]);
    const[recentAuctionItems,setRecentAuctionItems] = useState([]);

    const getContainerData = async()=>{
        var search = await fetch("https://horsetradingapidev.azurewebsites.net/api/AuctionItems/public");
        var data = await search.json();
        if(data != null || data != undefined){
            setContainerData(data);
        }
    }

    //Asettaa home sivulla seurattavien viimeksi vierailtujen auctionitemien id:n 
    const getRecentAuctionItems = async ()=>{
        var list = cookies?.recentAuctionItems;
        if(list != null && list != undefined && list != ""){
            const options = {
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                body:JSON.stringify(list)
            }

            console.log(list);
            var search = await fetch(`https://horsetradingapidev.azurewebsites.net/api/AuctionItems/Recent`,options);
            var data = await search.json();
            
            if(data?.result != "Error" && data?.result != null && data?.result != undefined){
                console.log(data?.message);
            }
            else{
                setRecentAuctionItems(data);
                console.log(data);
                console.log("data");
                //TODO: tee graafinen liittymä recent auctionitemsseille
            }
        }
    }

    useEffect(()=>{
        getContainerData();
        getRecentAuctionItems();
    },[]);


    
    return(
        <div className='homeMainDiv'>
            {/* Recently viewed, does not work yet. Only shows the last visited item */}
            {/* <div>
                <h2>Recently viewed</h2>
                <div>
                <CardGroup>

                    {recentAuctionItems.map((e)=>{
                        console.log("e");
                        console.log(e);
                        return (
                            <StoreCell data={e} />
                        )

                    })}
                </CardGroup>
                </div>
            </div> */}
            <div className='homeCellsDiv'>
                { 
                    containerData == null || containerData?.length == 0 ? 
                        <div className='homeSpinnerDiv'>
                            <Spinner variant="light" animation="border" />
                        </div> 
                    :
                    <CardGroup>
                    
                        {containerData.map(container => {
                            //Data palautuu nyt järkevämmin apista, palauttaa käyttäjän jonka alla palauttaa listassa käyttäjän auctionitemit.
                            //Tein tämän että yhdellä api kutsulla saisi kaikki tiedot näkymään
                            return (
                                <UserContainer user={container}/>
                            )
                        })}
                        
                    </CardGroup>
                        
                }
            </div>
            <div className='homeProductionDisclaimerDiv'>
                <h1>Site looking empty?</h1>
                <p>In the future this site will be filled with all kinds of beautiful art works to auction, but currently the site is still in production. More items will be posted soon. Sorry for the inconvenience.</p>
            </div>
        </div>
    );
}

export{Home}