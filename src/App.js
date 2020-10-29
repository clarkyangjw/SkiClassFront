
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Classes from './Classes';
import Class from './Class';
//import Header from './Header';
import Footer from './Footer';
import About from './About';
import ClassPost from './ClassPost';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import MyAccount from './MyAccount';
import ReserveClass from './ReserveClass';
import EditerUser from './EditerUser';
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavItem } from 'react-bootstrap';
// import Context from './Context'
import React, { useState, useEffect } from 'react'

function App() {

  const [isLogin, setIsLogin] = useState(false);

  // console.log("before if localstorage 'login':  " + localStorage.getItem('login'));
  useEffect(() => {
    if (localStorage.getItem('login')) {
      setIsLogin(localStorage.getItem('login'));
    }

    // console.log("asdasd11 " + isLogin);
  })

  // console.log("after use " + isLogin);


  return (
    !isLogin ? <div>
      <Navbar bg="white" inverse collapseOnSelect fixedTop>
        <Navbar.Header>
          <LinkContainer to="/">
            <Navbar.Brand>
              Home
          </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/About">
              <NavItem eventKey={1}>About us</NavItem>
            </LinkContainer>
            <LinkContainer to="/Classes">
              <NavItem eventKey={2}>Classes</NavItem>
            </LinkContainer>
            {/* <LinkContainer to="/classPost">
              <NavItem eventKey={3}>Post a class</NavItem>
            </LinkContainer> */}


            {/* 
          <LinkContainer to="/logout">
            <NavItem eventKey={5}>logout</NavItem>
          </LinkContainer> */}


            {/* <LinkContainer to="/account">
              <NavItem eventKey={7}>My account</NavItem>
            </LinkContainer> */}
          </Nav>
          <Nav pullRight>
            <LinkContainer to="/register">
              <NavItem eventKey={1}>Register</NavItem>
            </LinkContainer>
            <LinkContainer to="/login">
              <NavItem eventKey={2}>Login</NavItem>
            </LinkContainer>

          </Nav>

        </Navbar.Collapse>
      </Navbar>
      <br /><br /><br />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Switch>
              <Route exact path='/' render={() => (
                <Home />
              )} />
              <Route exact path='/About' render={() => (
                <About />
              )} />
              <Route exact path='/classPost' render={() => (
                <ClassPost />
              )} />
              <Route exact path='/Classes' render={(props) => (
                <Classes />
              )} />
              <Route exact path='/login' render={(props) => (
                <Login />
              )} />

              <Route exact path='/logout' render={(props) => (
                <Logout />
              )} />
              <Route exact path='/register' render={(props) => (
                <Register />
              )} />

              <Route exact path='/account' render={(props) => (
                <MyAccount />
              )} />

              <Route exact path='/class/:id' render={(props) => (
                <Class id={props.match.params.id} />
              )} />
            </Switch>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div> :
      <div>
        <Navbar bg="white" inverse collapseOnSelect fixedTop>
          <Navbar.Header>
            <LinkContainer to="/">
              <Navbar.Brand>
                Home
            </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>

              <LinkContainer to="/About">
                <NavItem eventKey={1}>About us</NavItem>
              </LinkContainer>
              <LinkContainer to="/Classes">
                <NavItem eventKey={2}>Classes</NavItem>
              </LinkContainer>
              {/* <LinkContainer to="/classPost">
                <NavItem eventKey={3}>Post a class</NavItem>
              </LinkContainer> */}


              <LinkContainer to="/account">
                <NavItem eventKey={4}>My account</NavItem>
              </LinkContainer>



              {/* <LinkContainer to="/register">
                <NavItem eventKey={6}>register</NavItem>
              </LinkContainer> */}
              {/* <LinkContainer to="/login">
              <NavItem eventKey={7}>login</NavItem>
            </LinkContainer> */}

            </Nav>

            <Nav pullRight>
              <LinkContainer to="/logout">
                <NavItem eventKey={1}>Logout</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <br /><br /><br />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Switch>
                <Route exact path='/' render={() => (
                  <Home />
                )} />
                <Route exact path='/About' render={() => (
                  <About />
                )} />
                <Route exact path='/classPost' render={() => (
                  <ClassPost />
                )} />
                <Route exact path='/Classes' render={(props) => (
                  <Classes />
                )} />
                <Route exact path='/login' render={(props) => (
                  <Login />
                )} />

                <Route exact path='/logout' render={(props) => (
                  <Logout />
                )} />
                <Route exact path='/register' render={(props) => (
                  <Register />
                )} />

                <Route exact path='/reserve/:id' render={(props) => (
                  <ReserveClass id={props.match.params.id} />
                )} />
                <Route exact path='/account' render={(props) => (
                  <MyAccount />
                )} />

                <Route exact path='/class/:id' render={(props) => (
                  <Class id={props.match.params.id} />
                )} />

                <Route exact path='/userpro/:id' render={(props) => (
                  <EditerUser id={props.match.params.id} />
                )} />
              </Switch>
            </div>
          </div>
        </div>

        <Footer></Footer>
      </div>
  );
}

export default App;
