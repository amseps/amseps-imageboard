import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component.js";
import Catalog from "./components/catalog.component.js";
import PostThread from "./components/post_thread.component.js";
import ViewThread from "./components/view_thread.component.js";


//remember that 3000 is for React elements, 5000 is for DB lelements
function App() {
  return (
    <Router>
      <Navbar />
      <br/>
      <Route path="/" exact component={Catalog} />
      <Route path="/post_thread" component={PostThread} />
      <Route path="/thread/:id" children={(props) => <ViewThread {...props}/>} />
    </Router>
  );
}

export default App;