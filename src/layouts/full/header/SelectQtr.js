import React from 'react';
import { IconQrcode } from '@tabler/icons-react';
import '../../../theme/FormStyle.css';
import { Box, Select, Checkbox, FormControl, Input, MenuItem, ListItemText } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = [
  'QTR 1',
  'QTR 2',
  'QTR 3',
  'QTR 4',
];

const SelectQtr = () => {
  const [personName, setPersonName] = React.useState([names[0]]); 

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Box className="accountStyle">
      <Box className="accountStyle_icon">
        <IconQrcode  style={{ marginTop: '-45px', marginLeft: '-80px' }} />
        </Box>
      <Box>

        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          value={personName}
          onChange={handleChange}
          className="select-search"
          input={<Input label="Tag" placeholder='Select Account' />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}  className='select-search'>
              <ListItemText primary={name} className='search-list' />
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  )
}

export default SelectQtr;
