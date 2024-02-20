const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("GET Request Called")
})
app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});