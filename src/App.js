// App.js
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HotPlace from './pages/HotPlace';
import HotPlaceDetail from './pages/HotPlaceDetail';
import Main from './pages/Main';
import Header from './components/Header';
import Footer from './components/Footer';
import TastyKorea from './pages/TastyKorea';
import TastyKoreaDetail from './pages/TastyKoreaDetail';
import TripCalc from './pages/TripCalc';
import Contact from './pages/Contact';
import HoneyTip from './pages/HoneyTip';
import InquirySection from './pages/InquirySection'; // ✨ 추가 ✨
import DonationSection from './pages/DonationSection'; // ✨ 추가 ✨

// App.js (수정된 Routes 부분)
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
        <Route path="/honey-tip" element={<HoneyTip />} />
        <Route path="/contact" element={<Contact />}>
          <Route index element={<Navigate to="qna" replace />} /> 
          <Route path="qna" element={<InquirySection />} /> 
          <Route path="donation" element={<DonationSection />} /> 
        </Route>

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
