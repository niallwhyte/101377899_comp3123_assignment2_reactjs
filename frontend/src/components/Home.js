import React from 'react';
import EmployeeList from './EmployeeList';
import AddEmployee from './AddEmployee';

const Home = () => {
  return (
    <div>
      <h1>List Of Employees</h1>
      <AddEmployee />
      {/* EmployeeList component */}
      <EmployeeList />
    </div>
  );
};

export default Home;