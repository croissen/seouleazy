import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HotPlace from './pages/HotPlace';
import HotPlaceDetail from './pages/HotPlaceDetail';
import Main from './pages/Main';
import Header from './components/Header';
import Footer from './components/Footer';
import TastyKorea from './pages/TastyKorea';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/hot-place" element={<HotPlace />} />
        <Route path="/hot-place-detail/:id" element={<HotPlaceDetail />} />
        <Route path="tasty-korea" element={<TastyKorea/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
