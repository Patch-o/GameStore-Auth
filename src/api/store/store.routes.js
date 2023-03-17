const express = require("express");
const { getAllStore, getStore, postStore } = require("./store.controller");
const storeRoutes = express.Router();

storeRoutes.get("/", getAllStore);
storeRoutes.get("/:id", getStore);
storeRoutes.post("/new", postStore);

module.exports = storeRoutes;
