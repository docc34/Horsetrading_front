import { Auction } from './Auction/Auction';
import { Home } from './Home/Home';
import { AuctionController } from './AuctionController/AuctionController';
import {Header} from './Header/Header';
import { Footer } from './Footer/Footer';
import { Registeration } from './Registeration/Registeration';
import './App.css';
import './i18n'

import {HashRouter,BrowserRouter ,Routes,Route } from 'react-router-dom';
import { UserProfile } from './UserProfile/UserProfile';

import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const [cookies] = useCookies(['locale']);
  const { t, i18n } = useTranslation();

  //Checks has the local changed.
  useEffect(async()=>{
    if(cookies?.locale != null && cookies?.locale != ""&& cookies?.locale != undefined)
      if(cookies.locale == "fi" ||cookies.locale == "en")
        await i18n.changeLanguage(cookies.locale);

  },[])
  return (
  <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Header />} exact />
      </Routes>
      <div className='appMainDiv'>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/Auction" element={<Auction />} exact />
          <Route path="/AuctionController" element={<AuctionController />} exact />
          <Route path={"/User"} element={<UserProfile />} />
          <Route path="/Registeration" element={<Registeration />} />
        </Routes>
      </div>
      <Routes>
        <Route path="/*" element={<Footer />} exact />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
