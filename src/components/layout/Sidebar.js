import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { Location } from '@reach/router';
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

function SidebarItem({ depth = 0, item, anchor = false }) {
  const { title, slug, items, anchors } = item;
  const [collapsed, setCollapsed] = React.useState(true);

  function onClick() {
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

  // eslint-disable-next-line react/prop-types
  const WithLink = ({ children }) => {
    if (anchor) {
      return <a href={slug}>{children}</a>;
    }
    if (slug) {
      return <Link to={slug}>{children}</Link>;
    }

    return children;
  };

  return (
    <>
      <WithLink>
        <ListItem
          className={`sidebar-item-level-${depth}`}
          onClick={() => onClick()}
          button
        >
          <ListItemText disableTypography style={{ paddingLeft: depth * 10 }}>
            {anchor ? '# ' : null}
            {title}
          </ListItemText>
          {expandIcon}
        </ListItem>
      </WithLink>
      <Collapse in={!collapsed} timeout="auto" unmountOnExit>
        {Array.isArray(items) ? (
          <List style={{ background: '#21646C' }}>
            {items.map((subItem, index) => (
              <SidebarItem
                key={`${subItem.id}${index}`}
                depth={depth + 1}
                item={subItem}
              />
            ))}
          </List>
        ) : null}
        {Array.isArray(anchors) ? (
          <List>
            {anchors.map((subItem, index) => (
              <SidebarItem
                key={`${subItem.id}${index}`}
                depth={depth + 1}
                item={subItem}
                anchor
              />
            ))}
          </List>
        ) : null}
      </Collapse>
      {0 === depth ? <Divider /> : null}
    </>
  );
}

function Sidebar(props) {
  return (
    <div className="sidebar">
      <Location>
        {({ location }) => {
          console.log(location);
          return <p>The location is {location.pathname}</p>;
        }}
      </Location>
      <List>
        {props.items.map((sidebarItem, index) => (
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

SidebarItem.propTypes = {
  depth: PropTypes.number,
  item: PropTypes.object.isRequired,
  anchor: PropTypes.bool
};

SidebarItem.defaultProps = {
  depth: 0,
  anchor: false
};

export default Sidebar;
