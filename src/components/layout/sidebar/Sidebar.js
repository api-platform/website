import React from 'react';
import PropTypes from 'prop-types';
import { List } from '@material-ui/core';
import SidebarItem from './SidebarItem';

function Sidebar({ items }) {
  return (
    <div className="sidebar">
      <List>
        {items.map((sidebarItem, index) => (
          <SidebarItem
            key={`${sidebarItem.title}${index}`}
            item={sidebarItem}
          />
        ))}
      </List>
    </div>
  );
}

Sidebar.propTypes = {
  items: PropTypes.array.isRequired
};

export default Sidebar;
