import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import { Collapse, Divider, List, ListItem, ListItemText } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

function SidebarItem({ depth = 0, item, anchor = false }) {
  const { title, slug, items, anchors } = item;
  const [collapsed, setCollapsed] = React.useState(true);

  function onClick() {
    if (slug) navigate(slug);

    setCollapsed(prevValue => !prevValue);
  }

  let expandIcon;
  if (Array.isArray(items) && items.length) {
    expandIcon = !collapsed ? (
      <ExpandLessIcon className="sidebar-item-expand-arrow" />
    ) : (
      <ExpandMoreIcon className="sidebar-item-expand-arrow" />
    );
  }

  if (Array.isArray(anchors) && anchors.length) {
    expandIcon = !collapsed ? (
      <ExpandLessIcon className="sidebar-item-expand-arrow" />
    ) : (
      <ExpandMoreIcon className="sidebar-item-expand-arrow" />
    );
  }

  return (
    <>
      <ListItem className={`sidebar-item-level-${depth}`} onClick={() => onClick(slug)} button>
        <ListItemText disableTypography style={{ paddingLeft: depth * 10 }} className="sidebar-item-content">
          {anchor ? '# ' : null}
          {title}
        </ListItemText>
        {expandIcon}
      </ListItem>
      <Collapse in={!collapsed} timeout="auto" unmountOnExit>
        {Array.isArray(items) ? (
          <List style={{ background: '#21646C' }}>
            {items.map((subItem, index) => (
              <SidebarItem key={`${subItem.id}${index}`} depth={depth + 1} item={subItem} />
            ))}
          </List>
        ) : null}
        {Array.isArray(anchors) ? (
          <List>
            {anchors.map((subItem, index) => (
              <SidebarItem key={`${subItem.id}${index}`} depth={depth + 1} item={subItem} anchor />
            ))}
          </List>
        ) : null}
      </Collapse>
      {0 === depth ? <Divider /> : null}
    </>
  );
}

function Sidebar({ items }) {
  return (
    <div className="sidebar">
      <List>
        {items.map((sidebarItem, index) => (
          <SidebarItem key={`${sidebarItem.title}${index}`} item={sidebarItem} />
        ))}
      </List>
    </div>
  );
}

Sidebar.propTypes = {
  items: PropTypes.array.isRequired,
};

SidebarItem.propTypes = {
  depth: PropTypes.number,
  item: PropTypes.object.isRequired,
  anchor: PropTypes.bool,
};

SidebarItem.defaultProps = {
  depth: 0,
  anchor: false,
};

export default Sidebar;
