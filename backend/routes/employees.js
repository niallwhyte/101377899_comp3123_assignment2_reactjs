const express = require('express');
const mongoose = require('mongoose');
const employeeModel = require('../models/Employee');
const router = express.Router();
const { isValidUser } = require('./validUser');

//Verify log in, in order to 
// List all employees
router.get('/', async (req, res) => {
  try {
    const employees = await employeeModel.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add an employee
router.post('/', async (req, res) => {
  try {
    const newEmp = new employeeModel({
      ...req.body,
    });

    const savedEmp = await newEmp.save();
    // created
    res.status(201).json(savedEmp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an employee
router.put('/:id', async (req, res) => {
  const { firstName, lastName, email } = req.body;
  try {
    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid employee ID' });
    }

    const updatedEmp = await employeeModel.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email },
      { new: true }
    );

    if (!updatedEmp) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(updatedEmp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete an employee
router.delete('/:id', async (req, res) => {
  try {
    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid employee ID' });
    }

    const deletedEmp = await employeeModel.findByIdAndDelete(req.params.id);

    if (!deletedEmp) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee successfully deleted', deletedEmp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;