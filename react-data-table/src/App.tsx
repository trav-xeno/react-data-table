import React from 'react';
import './App.css';
import employeeList from "./data/EmployeeList";
import SearchTable from "./components/SearchTable";
function App() {

  return (
     <>
      <header className="headers row mb-4">
        <h1 className="col-12">React Employee Filter </h1>
      </header>
      <main className="container">
        <SearchTable employeeList={employeeList}/>
      </main>
     </>
  );
}

export default App;
