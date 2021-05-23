import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCompactDisc, faHeadphonesAlt} from '@fortawesome/free-solid-svg-icons';
import {
  Link
} from "react-router-dom";

export class Home extends Component {
  render() {
    return (
      <Container fluid className="h-100" >
        {/* className="h-100 no-gutters" */}
        <Row className="h-100 w-100">
          <Col className="App-section-discover App-transition" xs={12} md={6}>
            <Link to="/discover" className="App-link h-100 w-100">
              <span className="h-100 w-100">
                  <FontAwesomeIcon icon={faHeadphonesAlt} size="2x" />
                  &nbsp;
                  Discover
              </span>
            </Link>
          </Col>
          <Col className="App-section-share App-transition" xs={12} md={6}>
            <span className="h-100 w-100">
              <Link to="/share" className="App-link">
                <FontAwesomeIcon icon={faCompactDisc} size="2x" />
                &nbsp;
                Share
              </Link>
            </span>
          </Col>
        </Row>
      </Container>
    );
  }
}