import React from 'react';
import { Route, Switch,Link, BrowserRouter } from "react-router-dom";
import './App.css';
import Mappings from './components/mappings/mappings';

function App() {
  return (
    <BrowserRouter>
      <div className="App" style={{paddingTop:"20px"}}>
        <Link to='/mappings'><button className="btn btn btn-success">Go to Mappings</button></Link>
      </div>
      <Switch>
        <Route path="/mappings" component={Mappings} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
