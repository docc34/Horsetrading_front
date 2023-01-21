import { Auction } from './Auction/Auction';
import { Home } from './Home/Home';
import { AuctionController } from './AuctionController/AuctionController';
import './App.css';
import '@inovua/reactdatagrid-community/index.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Auction" element={<Auction />}/>
          <Route path="/AuctionController" element={<AuctionController />}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
