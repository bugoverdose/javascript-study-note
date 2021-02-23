const API_URL = "https://api.coinpaprika.com/v1/tickers";

// Promise
fetch(API_URL)
  .then((kimchi) => {
    console.log(kimchi);
    return kimchi.json(); // potato에 담기는 값.
  })
  .then((potato) => console.log(potato));

// ======================================
// async-await
const paintData = async () => {
  const result = await (await fetch(API_URL)).json();
  console.log(result);
};

paintData();
