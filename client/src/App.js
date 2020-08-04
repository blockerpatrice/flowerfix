import React from 'react';
import './App.css';
import {Switch,Route} from "react-router-dom";
import Form from './Form.js';
import Confirm from './Confirm.js';

class App extends React.Component {
  render(){
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Form}/>
          <Route exact path="/confirm" component={Confirm}/>
        </Switch>
      </div>
    );
  }
}
export default App;
