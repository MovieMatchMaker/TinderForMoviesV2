const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const axios = require('axios');
import user_request_handler from "./user_request_handler.js";

const app = express();

app.use(cors());

dotenv.config();


app.use(function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
});

app.get('/api', (req, res) => {
      axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1&origin_country=US`)
            .then(response => {
                  res.send(response.data);
            }).catch(err => {
                  res.send(err);
            });
});

app.get('/api/matches', (req, res) => {
      axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1&origin_country=US`)
            .then(response => {
                  res.send(response.data);
            }).catch(err => {
                  res.send(err);
            });
});

app.get('/api/login', (req, res) => {

      const {username, }
      user_request_handler.login()

})



if (process.env.NODE_ENV === 'production') {
      app.use(express.static('client/public'));
      const path = require('path');
      app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
      });
}

const PORT = process.env.PORT

app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);

});
