const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { default: axios } = require('axios');
const app = express();
const port = 8080;

const FusekiClient = require('./fuseki')
fusekiClient = new FusekiClient()

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

app.get('/api/all', (req, res) => {
    fusekiClient.getAll().then((data) => {
        res.send(fusekiClient.formatAll(data))
    }).catch((err) => {
        console.log(err)
        res.send('Something went wrong')
    })
})

app.get('/api/stationName', (req, res) => {
    fusekiClient.getAllStationName().then((data) => {
        res.send(fusekiClient.formatStationName(data))
    }).catch((err) => {
        console.log(err)
        res.send('Something went wrong')
    })
});

app.get('/api/getId', (req, res) => {
    if(req.query.id){
        fusekiClient.getAllById(parseInt(req.query.id)).then((data) => {
            res.send(fusekiClient.formatIdData(data))
        }).catch((err) => {
            console.log(err)
            res.send('Something went wrong')
        })
    }
    else{
        console.log(req.query.id)
        res.send('No id provided')
    }
})

app.get('/', (req, res) => {
    fusekiClient.getAll()
    res.send('Hello');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});