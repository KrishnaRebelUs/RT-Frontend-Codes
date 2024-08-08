import React, { useState } from "react";
import { Autocomplete, TextField, Checkbox, createFilterOptions } from '@mui/material';

const MultiSelect = ({
  items,
  label,
  placeholder,
  selectAllLabel,
  noOptionsText,
  limitTags,
  onChange,
  selectedValues // Changed prop name from selectedValues to match the state name
}) => {
  const [selectedOptions, setSelectedOptions] = useState(selectedValues); // Use selectedValues prop here

  const allSelected = items.length === selectedOptions.length;
  const handleToggleOption = selectedOptions =>
    setSelectedOptions(selectedOptions);
  const handleClearOptions = () => setSelectedOptions([]);
  const getOptionLabel = option => `${option.label}`;
  const handleSelectAll = isSelected => {
    if (isSelected) {
      setSelectedOptions(items);
    } else {
      handleClearOptions();
    }
  };

  const handleToggleSelectAll = () => {
    handleSelectAll && handleSelectAll(!allSelected);
  };

  const handleChange = (event, selectedOptions, reason) => {
    if (reason === "select-option" || reason === "remove-option") {
      if (selectedOptions.find(option => option.value === "select-all")) {
        handleToggleSelectAll();
        let result = [];
        result = items.filter(el => el.value !== "select-all");
        return onChange(result);
      } else {
        handleToggleOption && handleToggleOption(selectedOptions);
        return onChange(selectedOptions);
      }
    } else if (reason === "clear") {
      handleClearOptions && handleClearOptions();
    }
  };
  const optionRenderer = (option, { selected }) => {
    const selectAllProps =
      option.value === "select-all"
        ? { checked: allSelected }
        : {};
    return (
      <>
        <Checkbox
          color="primary"
          style={{ marginRight: 8 }}
          checked={selected}
          {...selectAllProps}
        />
        {getOptionLabel(option)}
      </>
    );
  };
  const inputRenderer = params => (
    <TextField {...params} label={label} placeholder={placeholder} />
  );
  const getOptionSelected = (option, anotherOption) =>
    option.value === anotherOption.value;
  const filter = createFilterOptions();
  return (
    <Autocomplete
      multiple
      size="small"
      limitTags={limitTags}
      options={items}
      value={selectedOptions}
      disableCloseOnSelect
      getOptionLabel={getOptionLabel}
      getOptionSelected={getOptionSelected}
      noOptionsText={noOptionsText}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        return [{ label: selectAllLabel, value: "select-all" }, ...filtered];
      }}
      onChange={handleChange}
      renderOption={optionRenderer}
      renderInput={inputRenderer}
    />
  );
};

MultiSelect.defaultProps = {
  limitTags: 5,
  items: [],
  selectedValues: [], // Changed prop name from selectedValues to match the state name
  getOptionLabel: value => value
};

export default MultiSelect;
