import { useLocation } from "react-router-dom";

const UserProfile = () => {
    const search = useLocation().search;
    const auctionId = new URLSearchParams(search).get('userId');
    
    return (
        <div><h1>I'm profile {auctionId}</h1></div>
    )
}

export {UserProfile}