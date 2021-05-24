import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCompactDisc, faHeadphonesAlt} from '@fortawesome/free-solid-svg-icons';

export class Home extends Component {
  render() {
    return (
      <Container fluid className="h-100" >
        <Row className="h-100 w-100">
          <Col onClick={() => window.location = "/discover"} className="App-section-discover App-transition" xs={12} md={6}>
            <span className="w-100 position-absolute" style={{marginTop: "50%", marginLeft: "-50%"}}>
              <FontAwesomeIcon icon={faHeadphonesAlt} size="2x" />
              &nbsp;
              <h1>Discover</h1>
            </span>
          </Col>
          <Col onClick={() => window.location = "/share"} className="App-section-share App-transition" xs={12} md={6}>
            <span className="w-100 position-absolute" style={{marginTop: "50%", marginLeft: "-50%"}}>
              <FontAwesomeIcon icon={faCompactDisc} size="2x" />
              &nbsp;
              <h1>Share</h1>
            </span>
          </Col>
        </Row>
      </Container>
    );
  }
}