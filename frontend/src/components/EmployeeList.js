import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditEmployee from './EditEmployee';

const EmpList = () => {
  const [emps, setEmps] = useState([]);
  const [editingEmp, setEditingEmp] = useState(null);

  useEffect(() => {
    const getEmps = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/employees');
        setEmps(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getEmps();
  }, []);

  // Handlers
  const handleEdit = (employee) => {
    setEditingEmp(employee);
  };

  const handleEditSave = (editedEmployee) => {
    console.log('Edited Employee: ', editedEmployee)
    // Update the employee on the server
    axios.put(`http://localhost:5000/api/employees/${editedEmployee._id}`, editedEmployee)
      .then(response => {
        // Update the employee in the state
        setEmps(prevEmployees => prevEmployees.map(e => (e._id === editedEmployee._id ? editedEmployee : e)));
        setEditingEmp(null);
      })
      .catch(error => {
        console.error(error);
        console.log('Server Response:', error.response);
      });
  };

  const handleEditCancel = () => {
    setEditingEmp(null);
  };

  const handleDelete = (employeeId) => {
    // Implement delete functionality
    axios.delete(`http://localhost:5000/api/employees/${employeeId}`)
      .then(response => {
        // Remove the deleted employee from the state
        setEmps(prevEmployees => prevEmployees.filter(e => e._id !== employeeId));
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>List of Employees</h2>
      {/* use table or list */}
      <ul>
        {emps.map((employee) => (
          <li key={employee._id}>
            {employee.firstName} {employee.lastName} - {employee.email}
            <button onClick={() => handleEdit(employee)}>Edit</button>
            <button onClick={() => handleDelete(employee._id)}>Delete</button>
          </li>
        ))}
      </ul>
      {editingEmp && (
        <EditEmployee
          employee={editingEmp}
          onSave={handleEditSave}
          onCancel={handleEditCancel}
        />
      )}
    </div>
  );
};

export default EmpList;