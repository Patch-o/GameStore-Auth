const Store = require("./store.model");

const getAllStore = async (req, res, next) => {
  try {
    const stores = await Store.find().populate("games");
    return res.status(200).json(stores);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const getStore = async (req, res, next) => {
  try {
    const { id } = req.params; //getting id by destructuring req.params example
    const store = await Store.findById(id);
    return res.status(200).json(store);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const postStore = async (req, res, next) => {
  try {
    const newStore = new Store(req.body);
    const store = await newStore.save();
    res.status(201).json(store);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { getAllStore, getStore, postStore };
