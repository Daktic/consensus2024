
import Pool from "./Pool";


function Pools({data}) {
    return (
        <div style={styles.container}>
            <h1>Pool Metric Aggregator</h1>
            <Pool data={data}/>
            <Pool data={data}/>
        </div>
    )
}

const styles = {
    container: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    }
}

export default Pools;