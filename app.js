const express = require('express');
const app = express();
const port = 5001;
const morgan = require('morgan')
const connection = require('./config');

const playlistRouter = require('./routes/playlist.route');
const trackRouter = require('./routes/track.route');


app.use(express.json());
app.use(morgan('dev'))

connection.connect(err => {
    if (err) throw err;
    console.log('Successfully connected to the database')
})


app.use('/playlists', playlistRouter)
app.use('/tracks', trackRouter)




app.listen(port, (err) => {
    if (err) throw err;
    console.log(`app is listening at port ${port}`)
})