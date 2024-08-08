import React from 'react';
import { IconBrandRedux} from '@tabler/icons-react';
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
  'asn_otnc',
  'asn_imia_invalid_or_missing_arn',
  // 'ASN Accuracy',
  // 'Overage PO Units',
];

const SelectSubIssue = () => {
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
        <IconBrandRedux  style={{ marginTop: '-45px', marginLeft: '-80px' }} />
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

export default SelectSubIssue;