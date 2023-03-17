const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const passport = require('passport');
require('./utils/authentication/index');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();
//DOTENV

//DATABASE EXPORT
const db = require('./utils/database/database');
db.connectDb();

const videoGamesRoutes = require('./src/api/videogames/videogames.routes');
const storeRoutes = require('./src/api/store/store.routes');
const userRoutes = require('./src/api/users/users.routes');
const PORT = process.env.PORT || 5444;

//EXPRESS
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//HEADERS
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE"); //pemitimos estas operaciones
    res.header("Access-Control-Allow-Credentials", true); //permitimos que haya credenciales en nuestras peticiones
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

//CORS
app.use(cors({
    origin: '*',
    credentials: true
}));

//CONFIG SESSION COOKIES
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 15 * 60 * 1000 
    },
    store: MongoStore.create({ mongoUrl: db.DB_URL})//create session collection in DB
}))
//PASSPORT
app.use(passport.initialize());
app.use(passport.session());//dp de express.json y antes de passport.init

//ROUTES
app.use('/games',videoGamesRoutes);
app.use('/store', storeRoutes);
app.use('/users', userRoutes );
//SERVER
app.listen(PORT, () => {
    console.log(`Running server at: http://localhost:${PORT}`);
})