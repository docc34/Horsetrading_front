import { Auction } from './Auction/Auction';
import { Home } from './Home/Home';
import { AuctionController } from './AuctionController/AuctionController';
import {Header} from './Header/Header';
import { Footer } from './Footer/Footer';
import './App.css';
import '@inovua/reactdatagrid-community/index.css'
import {HashRouter,BrowserRouter ,Routes,Route } from 'react-router-dom';
import { UserProfile } from './UserProfile/UserProfile';

function App() {
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
          <Route path={`/users/:id`} element={<UserProfile />} />
        </Routes>
      </div>
      <Routes>
        <Route path="/*" element={<Footer />} exact />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
