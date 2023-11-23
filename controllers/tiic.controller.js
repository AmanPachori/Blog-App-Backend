const Data = require("../models/tiic.model");

const getAllData = async (req, res) => {
  try {
    const allData = await Data.find();
    res.json(allData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addData = async (req, res) => {
  const newData = new Data(req.body);

  try {
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllData,
  addData,
};
