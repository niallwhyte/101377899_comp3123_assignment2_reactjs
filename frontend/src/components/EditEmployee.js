import React, { useState } from 'react';

const EditEmployee = ({ employee, onSave, onCancel }) => {
  const [editedEmployee, setEditedEmployee] = useState({ ...employee });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee(prevEmployee => ({ ...prevEmployee, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedEmployee);
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={editedEmployee.firstName}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={editedEmployee.lastName}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Email:
        <input
          type="text"
          name="email"
          value={editedEmployee.email}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditEmployee;