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

//Weather
app.get('/api/weather', (req, res) => {
    axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_KEY}&q=Paris`).then((r) => {
        if (r)
            res.send(r.data);
        else
            res.sendStatus(404);
    });
});

//TGV
app.get('/api/TGV/all', (req, res) => {
    fusekiClient.getAllTGV().then((data) => {
        res.send(fusekiClient.formatAll(data))
    }).catch((err) => {
        console.log(err)
        res.send('Something went wrong')
    })
})

app.get('/api/TGV/stationName', (req, res) => {
    fusekiClient.getAllTGVStationName().then((data) => {
        res.send(fusekiClient.formatTGVStationName(data))
    }).catch((err) => {
        console.log(err)
        res.send('Something went wrong')
    })
});

app.get('/api/TGV/getId', (req, res) => {
    if(req.query.id){
        fusekiClient.getAllTGVById(parseInt(req.query.id)).then((data) => {
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

//Metro & Tram
app.get('/api/MetroTram/getNames', (req, res) => {
    fusekiClient.getMetroTramName().then((data) => {
        res.send(fusekiClient.formatMetroTram(data))
    }).catch((err) => {
        console.log(err)
        res.send('Something went wrong')
    });
});

app.get('/api/MetroTram/getAllByName', (req, res) =>  {
    if(req.query.name){
        fusekiClient.getMetroTramAllByName(req.query.name).then((data) => {
            res.send(fusekiClient.formatMetroTramAll(data))
        }).catch((err) => {
            console.log(err)
            res.send('Something went wrong')
        });
    }
    else{
        res.send('No station name provided')
    }
});

app.get('/', (req, res) => {
    res.send('Hello');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});