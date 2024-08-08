import React from 'react';
import { Box, Autocomplete,TextField,Checkbox,createFilterOptions  } from '@mui/material';
import { wrap } from 'lodash';


const account = [
    { text: 'MX - Chefman México S. d. R.L.'},
    { text: 'US - Panduit Corp. - Upstart' },
    { text: 'MX - Chefman México S. de R.L. de C.V.'},
    { text: 'US - Dude Products'},
    { text: 'CA - Nature’s Path Foods'},
    { text: 'CA - Iovate Health Sciences Incorporated CA'},
    { text: 'US - Polk Audio'},
    { text: 'US - Malin Goetz (Amazon)'},
    { text: 'US - Malin Goetz (Amazon)'}
  ];
const Search = () => {
	const [value, setValue] = React.useState([]);
	const [inputValue, setInputValue] = React.useState('');
  return (
	
	<Box className='search-box'>
		<Autocomplete
		multiple
		value={value}
		id="checkboxes-tags-demo"
		options={account}
		disableCloseOnSelect
		style={{overflow:'hidden', flexWrap:'nowrap', display:'flex'}}
		getOptionLabel={(option) => option.text}
		filterOptions={(options, params) => { 
			const filter = createFilterOptions()
			const filtered = filter(options, params)
			return [{ text: 'Select All', all: true }, ...filtered]
		  }}
		  onChange={(event, newValue) => {
			if (newValue.find(option => option.all))
			  return setValue(value.length === account.length ? [] : account)
	  
			  setValue(newValue)
		  }}
		renderOption={(props, option, { selected }) => (
			<li {...props}>
			<Checkbox
				style={{ marginRight: 8 }}
				checked={option.all ? !!(value.length === account.length) : selected}
			/>
			{option.text}
			</li>
		)}
		renderInput={(params) => (
			<TextField {...params}  placeholder="Select Amzon Vendor Account" />
		)}
		/>
	</Box>
  )
}


export default Search;
