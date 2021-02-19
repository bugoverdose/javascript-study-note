import "./styles.css";
import axios from "axios";

const span = document.querySelector("span");

const API_URL = "https://ipapi.co/json/";

const getGeoAPI = () => {
  axios.get(API_URL).then((response) => {
    const { data } = response;
    span.innerHTML = `Your are in ${data.city}, ${data.region}!`;
  });
  span.innerHTML = "Getting your location...";
};

getGeoAPI();
