import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Prayer from "./Pages/Prayer";
import Header from "./Components/Header";
import TasbeehCounter from "./Pages/TasbeehCounter";
import QiblaFinder from "./Pages/QiblaFinder";
import Loader from "./Components/Loader";
import { useState, useEffect } from "react";
import CookieConsent from "./Components/CookiesConsent";

const App = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // simulate loading
  }, []);

  return (
    <div className="dark:bg-black relative bg-white">
      {loading ? <Loader /> : (
        <>
          <BrowserRouter basename="/Sajdah">
            <Header />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Prayer" element={<Prayer />} />
              <Route path="/TasbeehCounter" element={<TasbeehCounter />} />
              <Route path="/QiblaFinder" element={<QiblaFinder />} />
            </Routes>
          </BrowserRouter>
          <CookieConsent />
          <Footer />    
        </>)}
        
    </div>
  );
};

export default App;
