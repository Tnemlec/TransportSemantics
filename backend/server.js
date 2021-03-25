const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { default: axios } = require('axios');
const app = express();
const port = 8080;

if (app.settings.env === "development") {
    let result = dotenv.config();
    if (result.error) {
        throw result.error;
    }
}

app.use(cors());
app.use(express.static('public'));

app.get('/api/weather', (req, res) => {
    axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_KEY}&q=Paris`).then((r) => {
        if (r)
            res.send(r.data);
        else
            res.sendStatus(404);
    });
});

app.get('/', (req, res) => {
    res.send('Hello');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});