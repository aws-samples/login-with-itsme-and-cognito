// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { Auth } from "aws-amplify";

function FederatedSignIn(props) {
  return (
    <Row>
      <Col sm={10}>
        <Card style={{ width: "100%" }}>
          <Card.Body className="d-flex flex-column align-items-center">
            <Card.Title>
              <h3 style={{ textAlign: "center" }}>Welcome</h3>
            </Card.Title>
            <Card.Text style={{ textAlign: "center" }}>
              In order to proceed please click on the button below to authenticate:
            </Card.Text>
            <Row >
                <Button
                  className="btn btn-outline-light"
                  onClick={() =>
                    Auth.federatedSignIn({ provider: props.federatedIdName }).then(cred => {
                      return Auth.currentAuthenticatedUser();
                    }).then(user => {
                      console.log(user);
                    }).catch(e => {
                      console.log(e)
                    })
                  }
                >
                  This button needs to be replaced by the official itsme button for production usage
                </Button>
            </Row>
            <a href="https://brand.belgianmobileid.be/d/V8JsvxIYy349/ui-library">Link to itsme logo</a>
          </Card.Body>
        </Card>
      </Col>
      
    </Row>
  );
}

export default FederatedSignIn;