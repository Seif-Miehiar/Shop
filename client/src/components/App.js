import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Header from "./header/header.component"; 
// import NotFound from './notFound/NotFound';
import Signin from './signin/signin.component';
import Signup from './signup/signup.component';
// import Home from './home/Home';


function App() {
  return (
    <BrowserRouter>
    <Header />
    <main>
      <Switch>
        {/* <Route exact path="/" component={Home}/> */}
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        {/* <UserRoute exact path="/user/dashboard" component={UserDashboard} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} /> */}
        {/* <Route component={NotFound} /> */}
      </Switch>
    </main>
  </BrowserRouter>
  );
}

export default App;
