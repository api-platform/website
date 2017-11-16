import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import NavItem from 'components/docs/NavItem';

class DocNav extends Component {
  componentWillMount() {
    const { location, history } = this.props;

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
