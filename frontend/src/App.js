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
        let mostRecentIndex = contractData.data.length - 1
        console.log(contractData.data[mostRecentIndex]);
        let aggData = new AggData(
            mathModule.totalSupply(asset1._embedded.records[0].amount, asset2._embedded.records[0].amount),
            contractData.data[mostRecentIndex].feeLock,
            contractData.tokenA.data[mostRecentIndex].reservedAmount + contractData.tokenB.data[mostRecentIndex].reservedAmount,
            (asset1._embedded.records[0].amount - (contractData.tokenA.data[mostRecentIndex].locked + contractData.tokenA.data[mostRecentIndex].reservedAmount)) +
            (asset2._embedded.records[0].amount - (contractData.tokenB.data[mostRecentIndex].locked + contractData.tokenB.data[mostRecentIndex].reservedAmount)),
            contractData.data[mostRecentIndex].overallPaymentCount,
            contractData.data[mostRecentIndex].totalPaymentsCount,
            contractData.data[mostRecentIndex].totalTradeCount
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
