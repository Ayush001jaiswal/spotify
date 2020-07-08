import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom'
import Home from './containers/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
          <Home /> 
      </div>
    </BrowserRouter>  
  );
}

export default App;
