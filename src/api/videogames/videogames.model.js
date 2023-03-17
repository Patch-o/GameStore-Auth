const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gamesSchema = new Schema(
    {
        name: {type: String ,  required: true},
        company: {type: String, required: true},
        year: { type: Number, default: ' Unknown'},
        genre: {type: String, default: "Unknown"},
        platform: [{ type:  String, enum: ['playstation','xbox','pc','nintendo'], required:true}],
        deprecated: { type: Boolean, required: true },
        price: { type: Number}
    },
    {
        timestamps: true
    }
);

const VideoGame = mongoose.model('VideoGame', gamesSchema);

module.exports= VideoGame;