const express = require('express');
const { isAuthenticated } = require('../../../utils/middlewares/auth.middleware');

const mainRoutes = express.Router();

mainRoutes.get('/',(req, res) => {
    return res.send('Hello World!! Server Running')
});


//Example of intserting a middleware insiade a route
mainRoutes.get("/private",[isAuthenticated],(req, res) =>{
     return res.send("warup G, this is a private route, just for you homie!")
})

module.exports = mainRoutes;