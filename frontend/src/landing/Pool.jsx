import {useEffect, useState} from "react";
import {AggMath} from "../scraper/math";

import chartData from "../mock/mockLP.json"
import LpChart from "./Chart";




function Pool({data}) {
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

    const lockedAmountA = []
    for (let i =0; i < chartData.tokenA.data.length; i++ ) {
        lockedAmountA.push(chartData.tokenA.data[i].reservedAmount);
    }
    const lockedAmountB = []
    for (let i =0; i < chartData.tokenB.data.length; i++ ) {
        lockedAmountB.push(chartData.tokenB.data[i].reservedAmount);
    }
    console.log(lockedAmountA, lockedAmountB);
    const pool1 = {
        labels: ['2024-05-01', '2024-05-02', '2024-05-03', '2024-05-04'],
        datasets: [
            {
                label: 'Token A',
                data: lockedAmountA,
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
            {
                label: 'Token B',
                data: lockedAmountB,
                fill: false,
                backgroundColor: 'rgb(188,75,192)',
                borderColor: 'rgba(135,75,192,0.2)',
            },
        ],
    };


    return (
        <div style={styles.container}>
            <div>
                <div>
                    <h2>Risk Score</h2>
                    <p>{riskScore}</p>
                </div>
                <div>
                    <h3>Total Supply</h3>
                    <p>{totalSupply}</p>
                </div>
                <LpChart
                    chartData={pool1}
                />
            </div>
        </div>
    );
}

const styles = {
    container: {
        backgroundColor: "rgba(128,128,128,0.35)",
        width: "50%",
        display: "flex",
    }
}

export default Pool;