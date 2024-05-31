import {useEffect, useState} from "react";
import {AggMath} from "../scraper/math";

import chartData from "../mock/mockLP.json"
import LpChart from "./Chart";




function Pool({data, getRiskScore}) {
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
        setTotalSupply(Math.round(data.totalSupply),2);
        setFeeLock(data.feeLock);
        setReservedAmount(data.reservedAmount);
        setCirculatingSupply(data.circulatingSupply);
        setTrustlessnes(data.trustlessness);
        setOverallPaymentCount(data.overallPaymentCount);
        setTotalPaymentsCount(data.totalPaymentsCount);
        setTotalTradeCount(data.totalTradeCount);
        setOverallTradedVolume(data.overallTradedVolume);
        setRiskScore(Math.round(am.riskScore(data)),2)
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
                backgroundColor: '#B7A7EF',
                borderColor: 'rgba(183,167,239,0.37)',
            },
            {
                label: 'Token B',
                data: lockedAmountB,
                fill: false,
                backgroundColor: '#00A2AF',
                borderColor: 'rgba(0,162,175,0.32)',
            },
        ],
    };


    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <div>
                    <h2 style={styles.title}>Risk Score</h2>
                    <p>{riskScore}</p>
                </div>
                <div>
                    <h3 style={styles.subtitle}>Total Supply</h3>
                    <p>{totalSupply}</p>
                </div>
                <div style={styles.chart}>
                    <LpChart chartData={pool1}/>
                </div>
                <button style={styles.button} onClick={getRiskScore}>Get Risk Score</button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#f0f0f0',
    },
    content: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%',
    },
    title: {
        fontSize: '24px',
        marginBottom: '10px',
        fontFamily:'Lora Bold'
    },
    subtitle: {
        fontSize: '18px',
        marginBottom: '5px',
        fontFamily: 'Inter'
    },
    button: {
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#F7D423',
        color: '#000000',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    chart: {
        marginTop: '20px',
    },
};

export default Pool;