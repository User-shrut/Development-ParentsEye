const express = require('express');
const router = express.Router();
const Absent = require('../models/Absent');

// Get all data
router.get('/', async (req, res) => {
  try {
    const data = await Absent.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Save new data
router.post('/', async (req, res) => {
  const data = new Absent(req.body);
  try {
    const newData = await data.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update existing data
router.put('/:id', async (req, res) => {
  try {
    const updatedData = await Absent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete data
router.delete('/:id', async (req, res) => {
  try {
    await Absent.findByIdAndDelete(req.params.id);
    res.json({ message: 'Data deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
