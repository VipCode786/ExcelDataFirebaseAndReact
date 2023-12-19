import React from 'react';
import logo from './logo.svg';
import './App.css';
import ExcelUploader from './ExcelUploader';
import ExcelTableView from './ExcelTableView';

function App() {
  return (
    <div style={{maxWidth:"1440px",margin:"auto", padding:"50px"}}>
      <h1>Excel Upload to Firebase</h1>
      <ExcelUploader />
      <ExcelTableView />
    </div>
  );
}

export default App;
