/*
  Deprecated!
  https://www.npmjs.com/package/request#super-simple-to-use
  
  import request from "request";
  request('http://www.google.com', function (error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });
*/

import express from "express";
import request from "request";

const app = express();

app.get("/", (req, res) => {
  if (req.query.url) {
    let URL = req.query.url;
    if (!URL.includes("http", 0)) {
      URL = `http://${URL}`;
    }
    request(URL, (_, response) => {
      if (response && response.statusCode <= 445) {
        res.send("Up!");
      } else {
        res.send("Down!");
      }
    });
  } else {
    res.send("");
  }
});

// Codesanbox does not need PORT :)
app.listen(() => console.log(`Listening!`));
