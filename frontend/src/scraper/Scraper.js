

class Scraper {
    async makeRequest(url, options) {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }
}

export default Scraper;