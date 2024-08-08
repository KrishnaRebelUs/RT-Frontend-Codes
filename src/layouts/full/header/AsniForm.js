import React from 'react';
import { IconBrandRedux } from '@tabler/icons-react';
import '../../../theme/FormStyle.css';
import { Box, TextField,styled, Button } from '@mui/material';
import { borderRadius } from '@mui/system';

const AsniForm = () => {
  const [inputValue, setInputValue] = React.useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Input Value:', inputValue);
  };
  const TextFieldStyled = styled(TextField)(({ theme }) => ({
	height:'30px',
	marginTop:'0',
	border:'none',
	borderRadius: '7px',
	backgroundColor: theme.palette.primary.main,
	'& input':{
		height: '9px',
		backgroundColor: theme.palette.primary.extraLight,
		border: 'none',
		color: theme.palette.secondary.main,
		opacity:'1',
		borderRadius: '7px',
		'&:placeholder':{
			color: '#fff',
		}
	},
	'& fieldset':{
		border: 'none',
		borderRadius: '7px',

		
	}

}));
  return (
    <Box className="accountStyle">
      <form onSubmit={handleSubmit} className="formStyle">
        <TextFieldStyled
          variant="outlined"
          value={inputValue}
          onChange={handleChange}
		  placeholder="Enter ASIN, B08Y675271..."
          fullWidth
          margin="normal"
        />
      </form>
    </Box>
  );
}

export default AsniForm;
