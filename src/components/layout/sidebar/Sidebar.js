import React from 'react';
import PropTypes from 'prop-types';
import { Location } from '@reach/router';
import { List } from '@material-ui/core';
import SidebarItem from './SidebarItem';

function Sidebar({ items }) {
  return (
    <Location>
      {({ location }) => (
        <div className="sidebar">
          <p>The location is {location.pathname}</p>
          <List>
            {items.map((sidebarItem, index) => (
              <SidebarItem
                key={`${sidebarItem.title}${index}`}
                item={sidebarItem}
              />
            ))}
          </List>
        </div>
      )}
    </Location>
  );
}

Sidebar.propTypes = {
  items: PropTypes.array.isRequired
};

export default Sidebar;
