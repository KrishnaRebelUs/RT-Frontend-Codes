import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse, List, ListItemText } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import NavItem, { ListItemStyled, ListItemIconStyled } from './NavItem';

const NavDropdown = ({ item, pathDirect }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemStyled button onClick={handleClick} data-title={item.title}>
        <ListItemIconStyled data-title={item.title}>
          <item.icon />
        </ListItemIconStyled>
        <ListItemText primary={item.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemStyled>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.children.map((child) => (
            <NavItem key={child.id} item={child} pathDirect={pathDirect} level={1} />
          ))}
        </List>
      </Collapse>
    </>
  );
};

NavDropdown.propTypes = {
  item: PropTypes.object.isRequired,
  pathDirect: PropTypes.string.isRequired,
};

export default NavDropdown;
