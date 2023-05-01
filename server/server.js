const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config()

const app = express();
// App PORT set with production check
const PORT = process.env.PORT || 5012;

// Route includes
const favoriteRouter = require('./routes/favorite.router');
const categoryRouter = require('./routes/category.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('build'));

// Routes
app.use('/api/favorite', favoriteRouter);
app.use('/api/category', categoryRouter);

app.post('/search', (req, res) => {
  console.log(req.body.value);
  axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${req.body.value}&limit=10`)
       .then(response => {
        res.send(response.data);
       }).catch(error => {
        console.log(`Error in GET /search`, error)
        res.sendStatus(500);
       })
});

// Listen
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
