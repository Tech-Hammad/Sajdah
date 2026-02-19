import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Prayer from "./Pages/Prayer";
import PrayerTagline from "./Components/PrayerTagline";
import Header from "./Components/Header";

const App = () => {
  return (
    <div className="dark:bg-black relative bg-white">
      <BrowserRouter>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prayer" element={<Prayer />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
