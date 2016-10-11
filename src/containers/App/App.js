import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

@asyncConnect([{
  promise: ({store: {}}) => {
    const promises = [];
    return Promise.all(promises);
  }
}])
@connect(
  state => state,
  {pushState: push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const styles = require('./App.scss');
    const logoImage = require('./logo-header.svg');

    return (
      <div>
        <Helmet {...config.app.head}/>

        <header id="header">
        <Navbar inverse fixedTop>
          <Navbar.Header>
            <Navbar.Toggle />
            <Navbar.Brand>
              <Link className="navbar-brand" to="/"><img height="48" src={logoImage} alt="API Platform" /></Link>
            </Navbar.Brand>
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/download"><NavItem eventKey={1}><span className="fa fa-download" /> Download</NavItem></LinkContainer>
              <LinkContainer to="/docs/"><NavItem eventKey={2}><span className="fa fa-book" /> Docs</NavItem></LinkContainer>
              <NavItem eventKey={3} href="https://demo.api-platform.com"><span className="fa fa-mouse-pointer" /> Demo</NavItem>
              <LinkContainer to="/news"><NavItem eventKey={4}><span className="fa fa-bullhorn" /> News</NavItem></LinkContainer>
              <LinkContainer to="/support"><NavItem eventKey={5}><span className="fa fa-comments" /> Support</NavItem></LinkContainer>
            </Nav>

            <Nav id="navbar-social" pullRight>
              <NavItem eventKey={6} href="https://github.com/api-platform/api-platform" title="GitHub" target="_blank"><span className="fa fa-github" /> <span className="text">GitHub</span></NavItem>
              <NavItem eventKey={7} href="https://twitter.com/ApiPlatform" title="Twitter" target="_blank"><span className="fa fa-twitter" /> <span className="text">Twitter</span></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        </header>

        {this.props.children}

        <footer id="footer" className="container footer">
            <div>
              <iframe src="https://ghbtns.com/github-btn.html?user=api-platform&repo=api-platform&type=star&count=true&size=small" frameBorder={0} scrolling={0} width="100px" height="20px" />
              <a href="https://twitter.com/ApiPlatform" className="twitter-follow-button" data-show-count="true" data-show-screen-name="false">Follow @ApiPlatform</a>
            </div>
            <p>
              © <a href="https://dunglas.fr" target="_blank">Kévin Dunglas</a> 2016. Supported by <a href="https://les-tilleuls.coop" target="_blank">Les-Tilleuls.coop</a>.
              Code licensed under <a href="https://github.com/api-platform/api-platform/blob/master/LICENSE" target="_blank">MIT</a>,
              documentation under <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank">CC BY 3.0</a>.
            </p>
        </footer>
      </div>
    );
  }
}
