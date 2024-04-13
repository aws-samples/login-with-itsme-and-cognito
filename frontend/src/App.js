import './App.css';
import React, { useState, useEffect, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Auth, Amplify } from 'aws-amplify'
import '@aws-amplify/ui-react/styles.css';
import Container from "react-bootstrap/Container";
import { Routes , Route, Navigate} from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import FederatedSignIn from "./components/FederatedSignIn.js";
import Protected from './components/Protected';
import Mydata from './components/Mydata';
import configData from "./config.json";




Amplify.configure({
  Auth: {
    region: configData.region,
    userPoolId: configData.userPoolId,
    userPoolWebClientId: configData.userPoolWebClientId,
    oauth: {
      domain: configData.domain,
      redirectSignIn: "http://localhost:3000",
      redirectSignOut: "http://localhost:3000",
      responseType: "code"
    }
  },
})
const federatedIdName = "itsme";

Amplify.configure({
  API: {
    endpoints: [
      {
        endpoint: configData.endpoint,
        region: configData.region,
        name: "ApiGatewayRestApi",
        custom_header: async () => {
          try {
            return { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` }
          }
          catch {
            return { Authorization: `Bearer` }
          }
        }
      }
    ],
  },
});

function App() {

  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [eid, setEid] = useState();
  const [allUserAttributes, setAllUserAttributes] = useState();
 

  useEffect(() => {
    Auth.currentUserInfo().then((response) => {
      console.log(response);
      response ? setAllUserAttributes(response.attributes): setAllUserAttributes(null)
      response ? setEmail(response.attributes.given_name) : setUser(null);
      response ? setEid(response.attributes["custom:eid"]) : setUser(null);
      response ? setUser(response.username) : setUser(null);
    });
  }, []);

  return (
    <Fragment>
      <Container>
        <br />
        {user ? (
          <>
            <Navbar bg='dark' variant='dark' expand="lg">
            <Container>
              <Navbar.Brand>ITSME/Cognito POC</Navbar.Brand>
              <Nav activeKey='/'>
                <LinkContainer to='/protected'>
                  <Nav.Link>UserInfo</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/mydata'>
                  <Nav.Link>My Data</Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav>
                <Button style={{ textAlign: "right" }} onClick={() => Auth.signOut()} className='ms-auto'>
                  {eid} <br />
                  {email}
                </Button>
              </Nav>
              </Container>
            </Navbar>
            <Container>
              <Routes>
                <Route path='/mydata' element={<Mydata/>} />
                <Route path='/protected' element={<Protected allUserAttributes={allUserAttributes}/>} />
                <Route path='/' element={<Navigate to="protected" />} >
                </Route>
              </Routes>
            </Container>
          </>
        ) : (
          <FederatedSignIn federatedIdName={federatedIdName} />
        )}
      </Container>
    </Fragment>

  );
}

export default App;
