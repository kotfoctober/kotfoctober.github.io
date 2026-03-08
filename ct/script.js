async function fetchCryptoData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
        const data = await response.json();
        
        const tickerContainer = document.getElementById('ticker-content');
        tickerContainer.innerHTML = ''; // Clear loading text

        data.forEach(coin => {
            const coinElement = document.createElement('span');
            coinElement.className = 'crypto-item';
            
            const priceChange = coin.price_change_percentage_24h;
            const changeClass = priceChange < 0 ? 'change-down' : '';

            coinElement.innerHTML = `
                ${coin.symbol.toUpperCase()}: 
                <span class="price">$${coin.current_price.toLocaleString()}</span>
                <span class="${changeClass}">(${priceChange.toFixed(2)}%)</span>
            `;
            
            tickerContainer.appendChild(coinElement);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('ticker-content').innerText = "Failed to load data.";
    }
}

// Initial fetch
fetchCryptoData();

// Refresh data every 2 minutes to respect API rate limits
setInterval(fetchCryptoData, 120000);
