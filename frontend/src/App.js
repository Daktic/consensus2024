import logo from './logo.svg';
import './App.css';
import LandingPage from "./landing/landingPage";
import Scraper from "./scraper/Scraper";
import {useState} from "react";
import {AggData} from "./scraper/math";



function App() {
    const [data, setData] = useState({});




    const maKeRequest = async () => {
        let scrappy = new Scraper()
            await scrappy.getAssetData("GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5", "USDC")
                .then((response) => {
                    console.log(response._embedded.records[0]);
                    console.log(response._embedded.records[0].amount);
                    let aggData = new AggData(
                        response._embedded.records[0].amount,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                    )
                    setData(aggData);
                    console.log(response);
                });
    }
  return (
    <div className="App">

      <LandingPage data={data}/>
        <button onClick={maKeRequest}>Click me</button>

    </div>
  );
}

export default App;
