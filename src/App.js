import { Auction } from './Auction/Auction';
import { Home } from './Home/Home';
import { AuctionController } from './AuctionController/AuctionController';
import {Header} from './Header/Header';
import { Footer } from './Footer/Footer';
import './App.css';
import '@inovua/reactdatagrid-community/index.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Header />}/>
        </Routes>
        <div className='appMainDiv'>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/Auction" element={<Auction />}/>
            <Route path="/AuctionController" element={<AuctionController />}/>
          </Routes>
        </div>
        <Routes>
          <Route path="/*" element={<Footer />}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
