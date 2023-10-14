import './Home.css';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import CardGroup from 'react-bootstrap/CardGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { UserContainer } from '../components/UserContainer';
import { UserCallingCard } from '../components/UserCallingCard';
import { useCookies } from 'react-cookie';
import { StoreCell } from '../components/StoreCell';
import { useTranslation } from 'react-i18next';

const Home = ()=>{
    const [cookies] = useCookies(["recentAuctionItems"]);
    const[containerData,setContainerData] = useState([]);
    const[recentAuctionItems,setRecentAuctionItems] = useState([]);
    const[searchBarValidated,setSearchBarValidated] = useState(false);

    const {t} = useTranslation();

    const handleSearchBarSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setSearchBarValidated(true);
        }
        else{
            event.preventDefault();
            console.log(event.target.companyName.value);
            getContainerData({
                companyName: event.target.companyName.value
            });
            setSearchBarValidated(false);
        }
    };

    const getContainerData = async(searchData)=>{
        let url = "https://horsetradingapidev.azurewebsites.net/api/AuctionItems/public";
        let params = [10];

        //Add all the possible filters to the list
        if(searchData?.companyName != null && searchData?.companyName != "")
            params[params.length] = "CreatorName="+searchData?.companyName;
            //Auction item type here
        // if(searchData?.companyName != null && searchData?.companyName != "")
        //     params[params.length] = "CreatorName="+searchData?.companyName;

        //Add the filter values to the query
        if(params?.length > 0){
            params?.map((e,i)=>{
                if(i == 0){
                    url = url +"?"+ e;
                }
                else{
                    url = url +"&"+ e;
                }
            });
        }

        
        var search = await fetch(url);
        var data = await search.json();
        if(data != null || data != undefined){
            setContainerData(data);
        }
        console.log(data);
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

            
            var search = await fetch(`https://horsetradingapidev.azurewebsites.net/api/AuctionItems/Recent`,options);
            var data = await search.json();
            
            if(data?.result != "Error" && data?.result != null && data?.result != undefined){
                console.log(data?.message);
            }
            else{
                setRecentAuctionItems(data);
                console.log(data);
                
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
            <div className="homeDescriptionDiv">
                <h1>{t("homeDescriptionTitle")}</h1>
                <p>{t("homeDescription")}</p> {/* your interested in some */}
                <Form noValidate validated={(searchBarValidated)} onSubmit={handleSearchBarSubmit}>
                    <InputGroup className="mb-3">
                        <Button type='submit' id="basic-addon2">Search</Button>
                        <Form.Control
                        name='companyName'
                        placeholder="Search for creators"
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                        />
                    </InputGroup>
                </Form>

            </div>
            <div className='homeCellsDiv'>
                { 
                    containerData == null || containerData?.length == 0 ? 
                        <div className='homeSpinnerDiv'>
                            <Spinner variant="light" animation="border" />
                        </div> 
                    :
                    <CardGroup className='homeUserContainerDiv'>
                    
                        {containerData.map((container, i) => {
                            //Data palautuu nyt järkevämmin apista, palauttaa käyttäjän jonka alla palauttaa listassa käyttäjän auctionitemit.
                            //Tein tämän että yhdellä api kutsulla saisi kaikki tiedot näkymään
                            console.log(container);
                            return container.userAuctionItems.map((item, i) => {
                                return(
                                    <div key={i} className='homeStoreCellMainDiv'>
                                        <UserCallingCard user={container}/>
                                        <StoreCell data={item} />
                                    </div>
                                )
                            })

                                // <UserContainer key={i} user={container}/>
                            
                        })}
                        
                    </CardGroup>
                        
                }
            </div>
            <div className='homeProductionDisclaimerDiv'>
                <h1>{t("homeProductionDisclaimerTitle")}</h1>
                <p>{t("homeProductionDisclaimerDescription")}</p>
            </div>
        </div>
    );
}

export{Home}