import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from 'components/layout/Header';
import BurgerButton from 'components/layout/BurgerButton';
import DocNav from 'components/layout/DocNav';
import Footer from 'components/layout/Footer';
import SideMenu from 'components/layout/SideMenu';
import 'styles/main.scss';
import helmetConfig from '../helmetConfig';

class TemplateWrapper extends Component {
  state = {
    showResponsiveMenu: false,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.setState(prevState => ({ ...prevState, showResponsiveMenu: false }));
    }
  }

  componentDidUpdate(prevState) {
    const { showResponsiveMenu } = this.state;
    if (prevState.showResponsiveMenu !== showResponsiveMenu) {
      document.body.className = showResponsiveMenu ? 'open' : '';
    }
  }

  showMenu = (open) => {
    this.setState(prevState => ({ ...prevState, showResponsiveMenu: open }));
  };

  render() {
    const { children, data, location } = this.props;
    const open = this.state.showResponsiveMenu;

    return (
      <div className={classNames('main full', { open })}>
        <div className="full">
          <Helmet {...helmetConfig.head} />
          <Header />
          <div className="page openable">{children()}</div>
          {-1 === location.pathname.search('/docs') && <Footer />}
          {-1 !== location.pathname.search('/docs') && (
            <DocNav nav={data.navDoc.edges} />
          )}
        </div>
        <BurgerButton
          onClick={this.showMenu.bind(null, !open)}
          status={open ? 'close' : 'burger'}
        />
        <div
          role="presentation"
          className="overlay"
          onClick={this.showMenu.bind(null, false)}
        />
        <SideMenu open={open} />
      </div>
    );
  }
}

// eslint-disable-next-line no-undef
export const pageQuery = graphql`
  query LayoutIndexQuery {
    indexDoc: markdownRemark(fields: { path: { eq: "docs/index" } }) {
      html
    }
    navDoc: allNavYaml {
      edges {
        node {
          title
          path
          items {
            id
            title
            anchors {
              id
              title
            }
          }
        }
      }
    }
  }
`;

TemplateWrapper.propTypes = {
  children: PropTypes.any,
  data: PropTypes.object,
  location: PropTypes.object.isRequired,
};

TemplateWrapper.defaultProps = {
  children: null,
  data: {},
};

export default TemplateWrapper;
