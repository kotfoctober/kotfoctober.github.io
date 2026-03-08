async function fetchCryptoData() {
    // Coinpaprika is more lenient with CORS and doesn't require a key
    const url = 'https://api.coinpaprika.com/v1/tickers?quotes=USD';

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
        }

        const data = await response.json();
        const tickerContainer = document.getElementById('ticker-content');
        
        // Clear loading text
        tickerContainer.innerHTML = ''; 

        // Get the top 100
        const top100 = data.slice(0, 100);

        top100.forEach(coin => {
            const coinElement = document.createElement('span');
            coinElement.className = 'crypto-item';
            
            const price = coin.quotes.USD.price;
            const priceChange = coin.quotes.USD.percent_change_24h;
            const changeClass = priceChange < 0 ? 'change-down' : '';

            // Formatting price: Use 2 decimals for big coins, more for small ones
            const formattedPrice = price > 1 ? price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : price.toFixed(6);

            coinElement.innerHTML = `
                ${coin.symbol}: 
                <span class="price">$${formattedPrice}</span>
                <span class="${changeClass}">(${priceChange.toFixed(2)}%)</span>
            `;
            
            tickerContainer.appendChild(coinElement);
        });
    } catch (error) {
        console.error('Ticker Error:', error);
        document.getElementById('ticker-content').innerText = "Data currently unavailable.";
    }
}

// Initial fetch
fetchCryptoData();

// Update every 5 minutes to stay safe
setInterval(fetchCryptoData, 300000);
