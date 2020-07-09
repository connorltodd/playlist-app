const express = require('express');
const router = express.Router();
const connection = require('../config');

// 1. as a user, I want to be able to create a new playlist.
// http://localhost:5001/playlists

router.post('/', (req, res) => {
    const formData = req.body;

    connection.query('INSERT INTO playlist SET ?', formData, (err, results) => {
        if (err) res.status(500).json(err)

        const newPlaylistId = results.insertId

        connection.query('SELECT * FROM playlist WHERE id = ?', newPlaylistId, (err, results) => {
            if (err) res.status(500).json(err)


            const newPlaylist = results
            res.status(200).send(newPlaylist)
        })

    })
});


// 2. as a user, I want to be able to see a playlist by entering its id in the url.
// http://localhost:5001/playlists/:id

router.get('/:id', (req, res) => {
    const playlistId = req.params.id;

    connection.query('SELECT * FROM playlist WHERE id = ? ', playlistId, (err, results) => {
        if (err) res.status(500).json(err)

        const playlist = results;
        res.status(200).json(playlist)
    })
});


// 5. as a user, I want to be able to delete a playlist.
// http://localhost:5001/playlists/1
router.delete('/:id', (req, res) => {
    const playlistId = req.params.id;

    connection.query('DELETE FROM playlist WHERE id = ?', playlistId, (err, results) => {
        if (err) res.status(500).json(err);

        res.status(200).json({
            message: 'The playlist was successfully deleted'
        });
    })
})


// 6. as a user, I want to be able to modify a playlist.
// When we do a put request the results.insertId does not exist. It only exists for newly created resources
// http://localhost:5001/playlists/1

router.put('/:id', (req, res) => {
    const playlistId = req.params.id;
    const formData = req.body;

    connection.query('UPDATE playlist SET ? WHERE id = ?', [formData, playlistId], (err, results) => {
        if (err) res.status(500).json(err)

        connection.query('SELECT * FROM playlist WHERE id = ?', playlistId, (err, results) => {
            if (err) res.status(500).json(err)

            const updatedPlaylist = results
            res.status(200).json(updatedPlaylist)

        })
    })
})




module.exports = router;

