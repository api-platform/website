import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavItem from '../docs/NavItem';
import DocNavItem from '../../lib/DocNavItem';
import { versions } from '../../../constants';
import { getPrefixedVersion } from '../../lib/versionHelper';

class DocNav extends Component {
  componentWillMount() {
    const { location } = this.props;
    if ('undefined' !== typeof window) {
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('click', this.handleScroll);
    }
    this.setState(prevState => ({
      ...prevState,
      currentItem: this.getItemByLocation(location),
    }));
  }

  updateLocation = args => {
    this.setState(prevState => ({
      ...prevState,
      locationWithHash: { ...args },
    }));
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      const { location } = nextProps;
      this.setState(prevState => ({
        ...prevState,
        currentItem: this.getItemByLocation(location),
      }));
    }
  }

  handleScroll() {
    if (document.querySelectorAll('.Collapsible.submenu__item.open')[0] === undefined) {
      return;
    }

    const currentItemOpen = document.querySelectorAll('.Collapsible.submenu__item.open')[0];
    const childsCurrentItem = currentItemOpen.querySelectorAll('a');
    const childsInnerPageItem = [];
    childsCurrentItem.forEach((child, index) => {
      childsInnerPageItem[index] = document.getElementById(child.getAttribute('href').split('#')[1]);
      child.parentElement.classList.remove('current');
    });

    for (let i = childsCurrentItem.length; 0 < i; i -= 1) {
      if (
        childsInnerPageItem[i] &&
        childsInnerPageItem[i].offsetTop < window.scrollY + 2 &&
        childsInnerPageItem[i].parentNode.offsetTop < window.scrollY + 2
      ) {
        childsCurrentItem[i].parentNode.classList.add('current');
        return;
      }
    }
  }

  getItemByLocation = location => {
    const eitherVersions = versions.map(getPrefixedVersion).join('|');
    const reg = new RegExp(`docs/(((${eitherVersions})/)?.*?)(/|$)`);
    const matches = location.pathname.match(reg);
    return matches ? matches[1] : null;
  };

  state = {
    currentItem: null,
  };

  toggleMenu = itemPath =>
    this.setState(prevState => ({
      ...prevState,
      currentItem: prevState.currentItem === itemPath ? null : itemPath,
    }));

  activateDocNavTree({ currentLocation, currentVersion, docNavItems }) {
    const currentPathParts = new URL(currentLocation).pathname
      .split('/')
      .filter(part => !!part.length)
      .filter((part, index) => {
        if (0 === index && 'docs' === part) {
          return false;
        }
        if (1 === index && currentVersion === part) {
          return false;
        }

        return true;
      });
    docNavItems.forEach(docNavItem => docNavItem.activateFromUri(`/${currentPathParts.join('/')}/`));
  }

  render() {
    const docNavItems = this.props.nav.map(item => new DocNavItem({ item }));
    const currentLocation = this.props.location.href;
    const currentVersion = this.props.version.substring(0, this.props.version.length - 1); // Remove trailing slash
    const basePath = `/docs/${currentVersion}`;

    // Detect active nav items based on current location
    this.activateDocNavTree({ currentVersion, currentLocation, docNavItems });

    return (
      <div className="docs__menu openable">
        <ul data-level="0">
          {docNavItems.map(item => (
            <NavItem docNavItem={item} key={item.uri} basePath={basePath} />
          ))}
        </ul>
      </div>
    );
  }
}

DocNav.propTypes = {
  location: PropTypes.object.isRequired,
  nav: PropTypes.array,
  version: PropTypes.string,
};

DocNav.defaultProps = {
  nav: [],
  version: '',
};

export default DocNav;
