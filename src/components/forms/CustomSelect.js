import React from 'react';
import PropTypes from 'prop-types';
import { Select as BaseSelect } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styled from '@mui/system/styled';
import useTheme from '@mui/system/useTheme';

const Select = React.forwardRef(function Select(props, ref) {
    const { options, defaultValue, onChange, ...other } = props;
    const theme = useTheme();

    const handleChange = (event) => {
        if (onChange) {
            onChange(event.target.value);
        }
    };

    return (
        <BaseSelect {...other} ref={ref} onChange={handleChange} value={defaultValue}>
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </BaseSelect>
    );
});

Select.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.any.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    defaultValue: PropTypes.any,
    onChange: PropTypes.func,
};

const Container = styled(Box)({
    display: 'flex',
    alignItems: 'center',
});

const Label = styled(Typography)({
    marginRight: '16px',
});

const CustomSelect = ({ label, options, defaultValue, onChange }) => {
    return (
        <Container>
            <Label variant="subtitle1">{label}</Label>
            <Select options={options} defaultValue={defaultValue} onChange={onChange} />
        </Container>
    );
};

CustomSelect.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.any.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    defaultValue: PropTypes.any,
    onChange: PropTypes.func,
};

export default CustomSelect;
