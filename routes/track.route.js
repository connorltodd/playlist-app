const express = require('express');
const router = express.Router();
const connection = require('../config');

// 3. as a user, I want to create and assign a song to a playlist.
// http://localhost:5001/tracks
router.post('/', (req, res) => {
    const formData = req.body;

    connection.query('INSERT INTO track SET ?', formData, (err, results) => {
        if (err) res.status(500).json(err)

        const newTrackId = results.insertId

        connection.query('SELECT * FROM track WHERE id = ?', newTrackId, (err, results) => {
            if (err) res.status(500).json(err)


            const newTrack = results
            res.status(200).send(newTrack)
        })

    })
})

// 4. as a user, I want to list all the songs from a playlist.
// http://localhost:5001/tracks?playlist_id=1
router.get('/', (req, res) => {

    let sql = 'SELECT * FROM track'
    let sqlValues = []

    if (req.query.playlist_id) {
        sql += ' WHERE playlist_id = ?'
        sqlValues.push(req.query.playlist_id)
    }

    connection.query(sql, sqlValues, (err, results) => {
        if (err) res.status(500).json(err);

        const tracks = results
        res.status(200).json(tracks)
    })
})


// 7. as a user, I want to delete a song from a playlist.
// http://localhost:5001/tracks/:id
router.delete('/:id', (req, res) => {
    const trackId = req.params.id;

    connection.query('DELETE FROM track WHERE id = ?', trackId, (err, results) => {
        if (err) res.status(500).json(err)

        res.status(200).json({
            message: 'Successfully deleted track'
        })
    })
})


// as a user, I want to edit a song from a playlist.
// http://localhost:5001/tracks/:id
router.put('/:id', (req, res) => {
    const trackId = req.params.id;
    const formData = req.body;

    connection.query('UPDATE track SET ? WHERE id = ?', [formData, trackId], (err, results) => {
        if (err) res.status(500).json(err)

        connection.query('SELECT * FROM track WHERE id = ?', trackId, (err, results) => {
            if (err) res.status(500).json(err)

            const updatedTrack = results
            res.status(200).json(updatedTrack)

        })
    })
})


module.exports = router;