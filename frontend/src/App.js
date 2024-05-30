import logo from './logo.svg';
import './App.css';
import LandingPage from "./landing/landingPage";
import Scraper from "./scraper/Scraper";
import {useState} from "react";
import {AggData, AggMath} from "./scraper/math";



function App() {
    const [data, setData] = useState({});




    const maKeRequest = async () => {
        let scrappy = new Scraper()
            let asset1 = await scrappy.getAssetData("GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5", "USDC")
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
            let asset2 = await scrappy.getAssetData("GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5", "USDC")
        let mathModule = new AggMath()
        let aggData = new AggData(
mathModule.totalSupply(asset1.totalSupply, asset2.totalSupply),
            mathModule.feeLock(asset1.feeLock, asset2.feeLock),
            mathModule.reservedAmount(asset1.reservedAmount, asset2.reservedAmount),
            mathModule.circulatingSupply(asset1.circulatingSupply, asset2.circulatingSupply),
            mathModule.trustlessness(asset1.trustlessness, asset2.trustlessness),
            mathModule.overallPaymentCount(asset1.overallPaymentCount, asset2.overallPaymentCount),
            mathModule.totalPaymentsCount(asset1.totalPaymentsCount, asset2.totalPaymentsCount),
            mathModule.totalTradeCount(asset1.totalTradeCount, asset2.totalTradeCount),
        )
    }
  return (
    <div className="App">

      <LandingPage data={data}/>
        <button onClick={maKeRequest}>Click me</button>

    </div>
  );
}

export default App;
