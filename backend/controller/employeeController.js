const Employee = require('../models/Employee');

const getAllEmployees = async (req, res) => {
    try{
        const emps = await Employee.find();
        res.json(employees);
    } catch(error) {
        res.status(500).json({ message: error.message});
    }
};

const createEmployee = async (res, req) => {
    const {firstName, lastName, email} = req.body;

    try{
        const newEmp = new Employee({
            firstName,
            lastName,
            email,
        });

        const savedEmp = await newEmp.save();
        res.status(201).json(savedEmp);
    } catch (error){
        res.status(400).json({ message: error.message});
    }
};

const updateEmployee = async (req,res) => {
    const {id} = req.params;
    const { firstName, lastName, email} = req.body;
    try{
        const updatedEmp = await Employee.findByIdAndUpdate(
            id,
            {firstName, lastName, email},
            {new: true}
        );
        if(!updatedEmp){
            return res.status(404).json({message: 'Emp not found'});
        }
        res.json(updatedEmp);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


const Employee = require('../models/Employee');

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEmp = await Employee.findByIdAndDelete(id);
    if (!deletedEmp) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    getAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
};

