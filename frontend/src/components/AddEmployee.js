import React, { useState } from 'react';
import axios from 'axios';
//handle and submit methods keep similar as done for login and register
const AddEmployee = () => {
  const [empData, setempData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleInputChange = (e) => {
    setempData({
      ...empData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddEmp = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to add a new employee
      const response = await axios.post('http://localhost:5001/api/employees', empData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data); // Log the response

      // Clear the form data after successful submission
      setempData({
        firstName: '',
        lastName: '',
        email: '',
      });

      // Additional handling...
    } catch (error) {
      console.error(error.response.data); // Log the error response
      // Additional error handling...
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <form onSubmit={handleAddEmp}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={empData.firstName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={empData.lastName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={empData.email}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;