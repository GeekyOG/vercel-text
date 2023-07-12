const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/api/", async (req, res) => {
  const encodedParams = new URLSearchParams();
  encodedParams.set("url", req.body.url);

  const options = {
    method: "POST",
    url: "https://url-shortener-service.p.rapidapi.com/shorten",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "74ce58cb69mshbbaf506e91ced2cp1d50e8jsnb8420dafcede",
      "X-RapidAPI-Host": "url-shortener-service.p.rapidapi.com",
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    res.json(error.message);
  }
});

const port = process.env.PORT || 8000;
app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
