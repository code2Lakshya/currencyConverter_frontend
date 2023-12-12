import Convertor from "./components/Convertor/Convertor";
import Navbar from "./components/Navbar/Navbar";
import './App.css';


function App() {

  return (
    <div >
      <Navbar />
      <div className="hero-section">
        <div className="hero-section-wrapper">
          <h1>Currency Convertor </h1>
          <Convertor />
        </div>
      </div>
    </div>
  );
}

export default App;
