const VideoGame = require('./videogames.model');

const getAllVideoGames =async (req, res, next) => {
    try {
        const allVideoGames = await VideoGame.find();
        return res.status(200).json(allVideoGames);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const getVideoGame = async (req,res) => {
    try {
        const id = req.params.id;
        const game = await VideoGame.findById(id);
        if (game) {
            return res.status(200).json(game);
        } else {
            return res.status(404).json("Game not found...404")
        }
    } catch (error) {
        return res.status(500).json(error);
        }
};

const postVideoGame =async (req, res) => {
    try {
        const newGame = new VideoGame(req.body);
        const createdGame = await newGame.save();
        return res.status(201).json(createdGame);
    } catch (error) {
        return res.status(500).json(error)
    }
}

const putVideoGame = async (req,res) => {
    try {
        const id = req.params.id;
        const game = new VideoGame(req.body);
        game._id = id;
        const updateGame = await VideoGame.findByIdAndUpdate(id, game);
        return res.status(202).json(updateGame);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const deleteVideoGame = async (req, res) => {
    try {
        const id = req.params.id;
        const game = await VideoGame.findByIdAndDelete(id);
        return res.status(200).json(game);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports={
    getAllVideoGames,
    getVideoGame,
    postVideoGame,
    putVideoGame,
    deleteVideoGame
}