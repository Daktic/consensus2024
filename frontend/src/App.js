import logo from './logo.svg';
import './App.css';
import LandingPage from "./landing/landingPage";
import Scraper from "./scraper/Scraper";
import {useState} from "react";



function App() {
    const [data, setData] = useState(null);




    const maKeRequest = async () => {
        let scrappy = new Scraper()
            await scrappy.makeRequest("http://localhost:3001/fetchData",)
                .then((response) => {
                    setData(response);
                    console.log(response);
                });
    }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

      </header>
      <LandingPage />
        <button onClick={maKeRequest}>Click me</button>

    </div>
  );
}

export default App;
