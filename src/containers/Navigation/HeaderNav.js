import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import AlgoliaSearch from '../../helpers/AlgoliaSearch';

class HeaderNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inline: !!this.props.inline,
      windowHeight: 790
    };

    this.refreshHeight = this.refreshHeight.bind(this);
    this.refreshInlineState = this.refreshInlineState.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.refreshHeight);
    this.refreshHeight();

    if (!!this.props.inline) {
      window.addEventListener('scroll', this.refreshInlineState);
    }

    AlgoliaSearch.refresh();
  }

  componentWillUnmount() {
    document.body.classList.remove('home');

    window.removeEventListener('resize', this.refreshHeight);

    if (!!this.props.inline) {
      window.removeEventListener('scroll', this.refreshInlineState);
    }
  }

  refreshHeight() {
    this.setState({
      windowHeight:  (
        window.innerHeight
        || document.documentElement.clientHeight
        || d.getElementsByTagName('body')[0].clientHeight
      )
    });
  }

  refreshInlineState() {
    this.setState({
      inline: document.body.scrollTop < this.state.windowHeight - document.querySelector('.navbar').offsetHeight
    });
  }

  render() {
    const logoImage = require('./logo-header.svg');

    return (
      <header id="header">
        <Navbar ref="navbar-container" inverse fixedTop={!this.state.inline}>
          <Navbar.Header>
            <Navbar.Toggle />
            <Navbar.Brand>
              <Link className="navbar-brand" to="/"><img height={48} src={logoImage} alt="API Platform" /></Link>
            </Navbar.Brand>
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="https://api.github.com/repos/api-platform/api-platform/zipball" target="_blank"><span className="fa fa-download" /> Download</NavItem>
              <LinkContainer to="/docs/"><NavItem eventKey={2}><span className="fa fa-book" /> Docs</NavItem></LinkContainer>
              <NavItem eventKey={3} href="https://demo.api-platform.com"><span className="fa fa-mouse-pointer" /> Demo</NavItem>
              <LinkContainer to="/news"><NavItem eventKey={4}><span className="fa fa-bullhorn" /> News</NavItem></LinkContainer>
              <LinkContainer to="/support"><NavItem eventKey={5}><span className="fa fa-comments" /> Support</NavItem></LinkContainer>
            </Nav>
            <form className="navbar-form navbar-left">
              <div className="form-group">
                <input type="search" id="search" className="form-control" placeholder="Search" />
                <span className="fa fa-search form-control-feedback" />
              </div>
            </form>

            <Nav id="navbar-social" pullRight>
              <NavItem eventKey={6} href="https://github.com/api-platform/api-platform" title="GitHub" target="_blank"><span className="fa fa-github" /> <span className="text">GitHub</span></NavItem>
              <NavItem eventKey={7} href="https://twitter.com/ApiPlatform" title="Twitter" target="_blank"><span className="fa fa-twitter" /> <span className="text">Twitter</span></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }

}

export default HeaderNav;
