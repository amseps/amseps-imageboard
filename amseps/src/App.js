import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/custom.css";

import Header from "./components/header.component.js";
import Catalog from "./components/catalog.component.js";
//import PostThread from "./components/post_thread.component.js";
import ViewThread from "./components/view_thread.component.js";
import error_404 from './components/error_404.js';
import BottomBar from './components/bottombar.component.js'
import Home from './components/home.component.js'
import Rules from './components/rules.component.js'


//remember that 3000 is for React elements, 5000 is for DB lelements
function App() {

  //<Route path="/post_thread" exact component={PostThread} /> //<-disabled

  return (
    <Router>
      <Header />
      <br/>
      <Switch>
      <Route path="/" exact component={Catalog} />
      <Route path="/thread/:id" exact children={(props) => <ViewThread {...props}/>} />
      <Route path="/home" exact component={Home} />
      <Route path="/rules" exact component={Rules} />
      <Route component={error_404} />
      </Switch>
      <BottomBar />
    </Router>
  );
}

export default App;