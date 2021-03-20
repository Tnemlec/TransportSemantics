const express = require('express');
const dotenv = require('dotenv');
const app = express();
const port = 3000;

if(app.settings.env === "development"){
    let result = dotenv.config();
    if (result.error) {
        throw result.error
    }
}

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile('public/index.html');
});
  
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});