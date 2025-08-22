// App.js
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HotPlace from './pages/HotPlace';
import HotPlaceDetail from './pages/HotPlaceDetail';
import Main from './pages/Main';
import Header from './components/Header';
import Footer from './components/Footer';
import TastyKorea from './pages/TastyKorea';
import TastyKoreaDetail from './pages/TastyKoreaDetail';
import TripCalc from './pages/TripCalc';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/hot-place" element={<HotPlace />} />
        <Route path="/hot-place-detail/:id" element={<HotPlaceDetail />} />
        <Route path="/tasty-korea" element={<TastyKorea />} />
        <Route path="/tasty-korea-detail/:id" element={<TastyKoreaDetail />} />
        <Route path="/trip-calc" element={<TripCalc />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
