import { Auction } from './Auction/Auction';
import { Home } from './Home/Home';
import { AuctionController } from './AuctionController/AuctionController';
import {Header} from './Header/Header';
import { Footer } from './Footer/Footer';
import { Registeration } from './Registeration/Registeration';
import {PrivacyPolicy} from './PrivacyPolicy/PrivacyPolicy';
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

  //search the users countrycode, if its finand default the language to finnish else its english
  const setLocale = async ()=>{
    let fetchLocale = await fetch("https://ipapi.co/country_code",{
      method: 'GET'
    });

    let userLocationInfo = await fetchLocale.text();

    if(cookies?.locale != null && cookies?.locale != ""&& cookies?.locale != undefined){
      if(cookies.locale == "fi" || cookies.locale == "en")
        await i18n.changeLanguage(cookies.locale);
    }
    else if(userLocationInfo == "FI")
      await i18n.changeLanguage("fi");
  }

  //Checks has the local changed.
  useEffect(()=>{
    setLocale();
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
          <Route path="/Registration" element={<Registeration />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
      <Routes>
        <Route path="/*" element={<Footer />} exact />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
