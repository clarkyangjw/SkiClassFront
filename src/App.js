
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './page/Home';
import Classes from './class/Classes';
import Class from './class/Class';
//import Header from './Header';
import Footer from './page/Footer';
import About from './page/About';
import ClassPost from './class/ClassPost';
import Login from './login&register/Login';
import Logout from './login&register/Logout';
import Register from './login&register/Register';
import MyAccount from './user/MyAccount';
import ReserveClass from './class/ReserveClass';
import EditerUser from './user/EditerUser';
import RegisterInstructor from './instructor/RegisterInstructor';
import InstructorAccount from './instructor/InstructorAccount';
import CheckInstructor from './instructor/CheckInstructor';
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavItem } from 'react-bootstrap';

// import Context from './Context'
import React, { useState, useEffect } from 'react'
function App() {

  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('login')) {
      setIsLogin(localStorage.getItem('login'));
    }
  })
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






              {/* <LinkContainer to="/register">
                <NavItem eventKey={6}>register</NavItem>
              </LinkContainer> */}
              {/* <LinkContainer to="/login">
              <NavItem eventKey={7}>login</NavItem>
            </LinkContainer> */}

            </Nav>

            <Nav pullRight>
              <LinkContainer to="/account">
                <NavItem eventKey={4}>My account</NavItem>
              </LinkContainer>
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
                {/* <Route exact path='/login' render={(props) => (
                  <Login />
                )} /> */}

                <Route exact path='/logout' render={(props) => (
                  <Logout />
                )} />
                <Route exact path='/register' render={(props) => (
                  <Register />
                )} />
                <Route exact path='/registerInstructor' render={(props) => (
                  <RegisterInstructor />
                )} />
                <Route exact path='/reserve/:id' render={(props) => (
                  <ReserveClass id={props.match.params.id} />
                )} />
                <Route exact path='/account' render={(props) => (
                  <MyAccount />
                )} />
                <Route exact path='/instructorAccount' render={(props) => (
                  <InstructorAccount />
                )} />

                <Route exact path='/class/:id' render={(props) => (
                  <Class id={props.match.params.id} />
                )} />

                <Route exact path='/userpro/:id' render={(props) => (
                  <EditerUser id={props.match.params.id} />
                )} />
                <Route exact path='/checkInstructor/:id' render={(props) => (
                  <CheckInstructor id={props.match.params.id} />
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
