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
          <BrowserRouter>
            <Header />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/prayer" element={<Prayer />} />
              <Route path="/TasbeehCounter" element={<TasbeehCounter />} />
              <Route path="/QiblaFinder" element={<QiblaFinder />} />
            </Routes>
          </BrowserRouter>
          <Footer />
        </>)}
    </div>
  );
};

export default App;
