import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Features from "./Components/Features";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <div className="dark:bg-black relative bg-white">
      <Navbar />
      <main id="home">
        <Hero />
        <About />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default App;
