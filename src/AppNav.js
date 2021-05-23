import React, {Component} from 'react';
import { Button, ListGroup, Nav, Navbar, OverlayTrigger, Popover } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export class AppNav extends Component {
  constructor(props) {
    super(props);

    this.state = { loggedInUser: props.loggedInUser, renderHome: props.renderHome, renderShare: props.renderShare, renderDiscover: props.renderDiscover, searchCriteria: "", showPopup: false };
  }

  popover = (
    <Popover id="popover-basic">
      <Popover.Content>
        <ListGroup>
          <ListGroup.Item action>View Profile</ListGroup.Item>
          <ListGroup.Item action>Settings</ListGroup.Item>
          <ListGroup.Item action>Logout</ListGroup.Item>
        </ListGroup>
      </Popover.Content>
    </Popover>);

  render() {
    return (
      <Navbar fixed="top" bg="dark" variant="dark">
        <Nav className="mr-auto">
          <Nav.Link style={{ visibility: this.state.renderHome ? "visible" : "collapse" }} href="/">Home</Nav.Link>
          <Nav.Link style={{ visibility: this.state.renderShare ? "visible" : "collapse" }} href="/share">Share</Nav.Link>
          <Nav.Link style={{ visibility: this.state.renderDiscover ? "visible" : "collapse" }} href="/discover">Discover</Nav.Link>
        </Nav>

        <Nav>
          <OverlayTrigger trigger="click" placement="bottom" overlay={this.popover} transition={false}>
          <Button variant="outline-dark"
            style={{color: "grey"}}
            onClick={(event) => this.setState({showPopup: !this.state.showPopup})}>
            <FontAwesomeIcon className="mt-2" icon={faUser} size="2x" />
          </Button>
          </OverlayTrigger>
          
        </Nav>

      </Navbar>
    );
  }
}
