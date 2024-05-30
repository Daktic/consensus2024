const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/fetchData', async (req, res) => {
    try {
        console.log("here")
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/html");


        let requestOptions = {
            method: 'Get',
            headers: myHeaders,
            redirect: 'follow'
        };

        const url = 'https://stellar.expert/explorer/testnet/contract/CAQCFVLOBK5GIULPNZRGATJJMIZL5BSP7X5YJVMGCPTUEPFM4AVSRCJU';
        const response = await fetch(url, requestOptions);
        console.log(await response);
        res.send(response);
    } catch (error) {
        res.status(500).send({ error: error.toString() });
    }
});

app.listen(3001, () => console.log('Proxy server running on http://localhost:3001'));