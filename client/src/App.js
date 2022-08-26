import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Landing from './routes/Landing.jsx';
import Home from './routes/Home.jsx';
import DetailPage from './routes/DetailPage.jsx';
import FormPage from './routes/FormPage.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path='/' component={Landing} />
        <Route exact path='/dogs' component={Home} />
        <Route exact path='/dogs/:id' component={DetailPage} />
        <Route exact path='/add' component={FormPage} />
      </div>
    </Router>
  )
};

export default App;
