const express = require('express');

const router = express.Router();

const {
    getAllVideoGames,
    getVideoGame,
    postVideoGame,
    putVideoGame,
    deleteVideoGame
}= require('./videogames.controller');


//ROUTES
router.get('/',  getAllVideoGames);

router.get('/:id', getVideoGame);

router.post('/new', postVideoGame);

router.put('/edit/:id', putVideoGame );

router.delete('/delete/:id', deleteVideoGame);

module.exports = router;