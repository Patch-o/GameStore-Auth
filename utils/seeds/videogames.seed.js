const mongoose = require("mongoose");
const db = require("../database/database");
const VideoGame = require("../../src/api/videogames/videogames.model");

const initialGames = [
  {
    name: "rust",
    company: "facepunch",
    year: 2013,
    genre: "survival",
    platform: ["pc", "playstation"],
    deprecated: false,
    price: 30,
  },
  {
    name: "skaterxl",
    company: "easy day",
    year: 2018,
    genre: "sports",
    platform: ["pc", "playstation"],
    deprecated: false,
    price: 25,
  },
  {
    name: "shredders",
    company: "papadelta",
    year: 2022,
    genre: "sports",
    platform: ["pc", "playstation"],
    deprecated: false,
    price: 20,
  },
  {
    name: "rocket league",
    company: "epic games",
    year: 2013,
    genre: "arcade",
    platform: ["pc", "playstation", "xbox", "nintendo"],
    deprecated: false,
    price: 40,
  },
];

mongoose
  .connect(db.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const allVideoGames = await VideoGame.find();

    if (allVideoGames.length) {
      console.log("eliminamos coleccion");
      await VideoGame.collection.drop();
    } else {
      console.log("No hay juegos en la BBDD, procedemos a introducir datos");
    }
  })
  .catch((error) =>
    console.log("error al borrar la coleccion de la BBDD", error)
  )
  .then(async () => {
    await VideoGame.insertMany(initialGames);
    console.log("Adding Games");
  })
  .catch((error) => console.log("error adding intitial list", error))
  .finally(() => mongoose.disconnect());
