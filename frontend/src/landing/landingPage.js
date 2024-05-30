import {useEffect, useState} from "react";
import {AggMath} from "../scraper/math";


function LandingPage({data}) {
    const [totalSupply, setTotalSupply] = useState(0);
    const [feeLock, setFeeLock] = useState(0);
    const [reservedAmount, setReservedAmount] = useState(0);
    const [circulatingSupply, setCirculatingSupply] = useState(0);
    const [trustlessness, setTrustlessnes] = useState(0);
    const [overallPaymentCount, setOverallPaymentCount] = useState(0);
    const [totalPaymentsCount, setTotalPaymentsCount] = useState(0);
    const [totalTradeCount, setTotalTradeCount] = useState(0);
    const [overallTradedVolume, setOverallTradedVolume] = useState(0);
    const [riskScore, setRiskScore] = useState();

    const am = new AggMath;

    useEffect(() => {
        setTotalSupply(data.totalSupply);
        setFeeLock(data.feeLock);
        setReservedAmount(data.reservedAmount);
        setCirculatingSupply(data.circulatingSupply);
        setTrustlessnes(data.trustlessness);
        setOverallPaymentCount(data.overallPaymentCount);
        setTotalPaymentsCount(data.totalPaymentsCount);
        setTotalTradeCount(data.totalTradeCount);
        setOverallTradedVolume(data.overallTradedVolume);
        setRiskScore(am.riskScore(data))
        console.log(data)
    }, [data]);

  return (
    <div>
      <h1>Pool Metric Aggregator</h1>
        <div>
            <div>
                <h2>Risk Score</h2>
                <p>{riskScore}</p>
            </div>
            <div>
                <h3>Total Supply</h3>
                <p>{totalSupply}</p>
            </div>
            <div>
                <h3>Locked in fee Pool</h3>
                <p>{feeLock}</p>
            </div>
            <div>
                <h3>Reserved Amount</h3>
                <p>{reservedAmount}</p>
            </div>
            <div>
                <h3>Circulating Supply</h3>
                <p>{circulatingSupply}</p>
            </div>
            <div>
                <h3>Trustlessness</h3>
                <p>{trustlessness}</p>
            </div>
            <div>
                <h3>Total Payments count</h3>
                <p>{totalPaymentsCount}</p>
            </div>
            <div>
                <h3>Overall Payment Count</h3>
                <p>{overallPaymentCount}</p>
            </div>
            <div>
                <h3>Total Trade Count</h3>
                <p>{totalTradeCount}</p>
            </div>
            <div>
                <h3>Overall Traded Volume</h3>
                <p>{overallTradedVolume}</p>
            </div>
        </div>
    </div>
  );
}

export default LandingPage;