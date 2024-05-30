

class Scraper {
    async makeRequest(url, options) {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    async getAssetData(issuerAddress, assetId) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'Get',
            headers: myHeaders,
            redirect: 'follow'
        };
        return await this.makeRequest(`https://soft-prettiest-shape.stellar-testnet.quiknode.pro/91c6ced6e05c1e8786b179bb37af31c59f2a952e/assets?asset_issuer=${issuerAddress}&asset_code=${assetId}`, requestOptions);
    }
}

export default Scraper;