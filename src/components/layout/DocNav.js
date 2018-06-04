import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import NavItem from 'components/docs/NavItem';

class DocNav extends Component {
  componentWillMount() {
    const { location, history } = this.props;
    window.addEventListener('scroll', this.handleScroll);
    this.setState(prevState => ({
      ...prevState,
      currentItem: this.getItemByLocation(location),
    }));
    this.unlisten = history.listen(this.updateLocation);
  }

  updateLocation = (args) => {
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
    if (document.querySelectorAll('.Collapsible.submenu__item.open')[0] !== undefined) {
      let current_item_open = document.querySelectorAll('.Collapsible.submenu__item.open')[0];
      let childs_current_item = current_item_open.querySelectorAll('a');
      let childs_inner_page_item = [];
      childs_current_item.forEach((child, index) => {
        childs_inner_page_item[index] = document.getElementById(child.getAttribute('href').split('#')[1]);
        child.parentElement.classList.remove('current');
      });
      for (let i = childs_current_item.length - 1; i > 0; i = i - 1) {
        if(childs_inner_page_item[i].offsetTop < window.scrollY) {
          childs_current_item[i].parentElement.classList.add('current');
          break;
        }
      }
    }
  }

  getItemByLocation = (location) => {
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
            key={item.node.path}
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
