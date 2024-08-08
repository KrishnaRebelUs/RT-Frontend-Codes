import React, { useState } from 'react';
import CustomSelect from '../CustomSelect/CustomSelect';
import CustomStepper from '../CustomStepper/CustomStepper';

const ParentComponent = () => {
  const [selectedVendor, setSelectedVendor] = useState(null);

  const handleVendorChange = (vendor) => {
    setSelectedVendor(vendor);
  };

  return (
    <div>
      <CustomSelect onVendorChange={handleVendorChange} />
      <CustomStepper selectedVendor={selectedVendor} />
    </div>
  );
};

export default ParentComponent;
