import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const WithLink = ({ slug, anchor, children }) => {
  if (anchor) {
    return <a href={slug}>{children}</a>;
  }
  if (slug) {
    return <Link to={slug}>{children}</Link>;
  }

  return children;
};

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

  return (
    <>
      <WithLink slug={slug} anchor={anchor}>
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

SidebarItem.propTypes = {
  depth: PropTypes.number,
  item: PropTypes.object.isRequired,
  anchor: PropTypes.bool
};

SidebarItem.defaultProps = {
  depth: 0,
  anchor: false
};

export default SidebarItem;
