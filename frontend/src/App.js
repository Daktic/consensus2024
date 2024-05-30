import logo from './logo.svg';
import './App.css';
import LandingPage from "./landing/landingPage";
import Scraper from "./scraper/Scraper";
import {useState} from "react";
import {AggData, AggMath} from "./scraper/math";
import contractData from  "./mock/mockLP.json";



function App() {
    const [data, setData] = useState({});




    const maKeRequest = async () => {
        let scrappy = new Scraper()
            let asset1 = await scrappy.getAssetData("GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5", "USDC")
            let asset2 = await scrappy.getAssetData("GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5", "USDC")
        let mathModule = new AggMath()
        let aggData = new AggData(
            mathModule.totalSupply(asset1.totalSupply, asset2.totalSupply),
            contractData.feeLock,
            contractData.tokenA.reservedAmount + contractData.tokenB.reservedAmount,
            (asset1.totalSupply - (contractData.tokenA.locked + contractData.tokenA.reservedAmount)) + (asset2.totalSupply - (contractData.tokenB.locked + contractData.tokenB.reservedAmount)),
            contractData.overallPaymentCount,
            contractData.totalPaymentsCount,
            contractData.totalTradeCount
        )
        setData(aggData)
    }
  return (
    <div className="App">

      <LandingPage data={data}/>
        <button onClick={maKeRequest}>Click me</button>

    </div>
  );
}

export default App;
