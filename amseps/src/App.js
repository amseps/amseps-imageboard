import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/custom.css";

import Navbar from "./components/navbar.component.js";
import Catalog from "./components/catalog.component.js";
//import PostThread from "./components/post_thread.component.js";
import ViewThread from "./components/view_thread.component.js";
import error_404 from './components/error_404.js';
import BottomBar from './components/bottombar.component.js'


//remember that 3000 is for React elements, 5000 is for DB lelements
function App() {

  //<Route path="/post_thread" exact component={PostThread} /> //<-disabled

  return (
    <Router>
      <Navbar />
      <br/>
      <Switch>
      <Route path="/" exact component={Catalog} />
      <Route path="/thread/:id" exact children={(props) => <ViewThread {...props}/>} />
      <Route component={error_404} />
      </Switch>
      <BottomBar />
    </Router>
  );
}

export default App;