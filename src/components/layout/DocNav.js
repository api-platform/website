import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import NavItem from 'components/docs/NavItem';

class DocNav extends Component {
  componentWillMount() {
    const { location, history } = this.props;
    if ('undefined' !== typeof window) {
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('click', this.handleScroll);
    }
    this.setState(prevState => ({
      ...prevState,
      currentItem: this.getItemByLocation(location),
    }));
    this.unlisten = history.listen(this.updateLocation);
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
    const reg = /docs\/(.*?)(\/|$)/;
    const matches = location.pathname.match(reg);
    return matches ? matches[1] : null;
  };

  componentWillUnmount() {
    this.unlisten();
  }

  state = {
    currentItem: null,
    locationWithHash: this.props.location,
  };

  toggleMenu = itemPath =>
    this.setState(prevState => ({
      ...prevState,
      currentItem: prevState.currentItem === itemPath ? null : itemPath,
    }));

  render() {
    const { currentItem, locationWithHash } = this.state;
    return (
      <div className="docs__menu openable">
        {this.props.nav.map(item => (
          <NavItem
            item={item}
            key={item.path}
            onClick={this.toggleMenu}
            current={currentItem}
            location={locationWithHash}
          />
        ))}
      </div>
    );
  }
}

DocNav.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  nav: PropTypes.array,
};

DocNav.defaultProps = {
  nav: [],
};

export default withRouter(DocNav);
