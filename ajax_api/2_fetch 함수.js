/* Promise */
const API_URL = "https://api.coinpaprika.com/v1/tickers";

fetch(API_URL)
  .then((kimchi) => {
    console.log(kimchi);
    return kimchi.json(); // potato에 담기는 값.
  })
  .then((potato) => console.log(potato));
