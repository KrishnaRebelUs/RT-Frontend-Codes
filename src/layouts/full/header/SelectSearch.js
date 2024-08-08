// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import Select from 'react-select';
// import axios from 'axios';
// import '../../../theme/FormStyle.css';
// import { IconUser } from '@tabler/icons-react';
// import { Box } from '@mui/material';
// import config from '../../../../config';
// import eventEmitter from '../../../eventEmitter';

// const CustomSelect = () => {
//   const [options, setOptions] = useState([]);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [displayOption, setDisplayOption] = useState(null);
//   const [token, setToken] = useState("");
//   const BASE_URL = config.UniUrl;

//   useEffect(() => {
//     const tokenFromStorage = sessionStorage.getItem('token');
//     if (tokenFromStorage) {
//       setToken(tokenFromStorage);
//     } else {
//       console.error('No token found in session storage');
//     }
//   }, []);

//   useEffect(() => {
//     const fetchVendors = async () => {
//       if (!token) return;

//       try {
//         const response = await axios.get(`${BASE_URL}/overbilling/getAllOverBillingVendors`, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         if (response.data.status === 'SUCCESS') {
//           const vendorOptions = response.data.data.map(vendor => ({
//             value: vendor.vendorId,
//             label: vendor.companyName
//           }));
//           setOptions(vendorOptions);

//           if (vendorOptions.length > 0) {
//             const defaultVendor = vendorOptions[4] || vendorOptions[0];
//             setSelectedOption(defaultVendor);
//             setDisplayOption(defaultVendor); 
//             sessionStorage.setItem('selectedVendorId', defaultVendor.value);
//             eventEmitter.emit('vendorSelected', defaultVendor.value);
//           }
//         } else {
//           console.error('Error fetching vendors:', response.data.errorMessage);
//         }
//       } catch (error) {
//         console.error('Error fetching vendors:', error);
//       }
//     };

//     fetchVendors();
//   }, [token, BASE_URL]);

//   const customStyles = useMemo(() => ({
//     control: (provided) => ({
//       ...provided,
//       textAlign: 'center'
//     }),
//     input: (provided) => ({
//       ...provided,
//       paddingLeft: '35px'
//     }),
//   }), []);

//   const handleSelectChange = useCallback((selectedOption) => {
//     sessionStorage.setItem('selectedVendorId', selectedOption ? selectedOption.value : null);
//     setSelectedOption(selectedOption);
//     setDisplayOption(selectedOption); // Set displayOption to selectedOption
//     eventEmitter.emit('vendorSelected', selectedOption.value);
//   }, []);

//   const handleInputChange = useCallback((inputValue, { action }) => {
//     if (action === 'input-change' && inputValue === '') {
//       setDisplayOption(selectedOption); // Restore displayOption if input is empty
//     }
//   }, [selectedOption]);

//   const handleMenuOpen = useCallback(() => {
//     setDisplayOption(null); // Clear displayOption on menu open
//   }, []);

//   return (
//     <>
//       <Box className="accountStyle_icon"><IconUser /></Box>
//       <Select
//         value={displayOption}
//         options={options}
//         onChange={handleSelectChange}
//         onInputChange={handleInputChange}
//         onMenuOpen={handleMenuOpen}
//         styles={customStyles}
//         isSearchable
//         placeholder="Select a vendor"
//       />
//     </>
//   );
// };

// export const useSelectedVendorId = () => {
//   return sessionStorage.getItem('selectedVendorId');
// };

// export default CustomSelect;






/*--------------------------------------------------------------- Code 1 -----------------------------------------------------------------*/






// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import Select from 'react-select';
// import axios from 'axios';
// import '../../../theme/FormStyle.css';
// import { IconUser } from '@tabler/icons-react';
// import { Box } from '@mui/material';
// import config from '../../../../config';
// import eventEmitter from '../../../eventEmitter';

// const CustomSelect = () => {
//   const [options, setOptions] = useState([]);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [displayOption, setDisplayOption] = useState(null);
//   const [token, setToken] = useState("");
//   const BASE_URL = config.UniUrl;

//   useEffect(() => {
//     const tokenFromStorage = sessionStorage.getItem('token');
//     if (tokenFromStorage) {
//       setToken(tokenFromStorage);
//     } else {
//       console.error('No token found in session storage');
//     }
//   }, []);

//   useEffect(() => {
//     const fetchVendors = async () => {
//       if (!token) return;

//       try {
//         const response = await axios.get(`${BASE_URL}/overbilling/getAllOverBillingVendors`, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         if (response.data.status === 'SUCCESS') {
//           const vendorOptions = response.data.data.map(vendor => ({
//             value: vendor.vendorId,
//             label: vendor.companyName
//           }));
//           setOptions(vendorOptions);

//           if (vendorOptions.length > 0) {
//             const defaultVendor = vendorOptions[4] || vendorOptions[0];
//             setSelectedOption(defaultVendor);
//             setDisplayOption(defaultVendor); 
//             sessionStorage.setItem('selectedVendorId', defaultVendor.value);
//             eventEmitter.emit('vendorSelected', defaultVendor.value);
//           }
//         } else {
//           console.error('Error fetching vendors:', response.data.errorMessage);
//         }
//       } catch (error) {
//         console.error('Error fetching vendors:', error);
//       }
//     };

//     fetchVendors();
//   }, [token, BASE_URL]);

//   const customStyles = useMemo(() => ({
//     control: (provided) => ({
//       ...provided,
//       paddingLeft: '40px' 
//     }),
//     input: (provided) => ({
//       ...provided,
//       marginLeft: '0px' 
//     }),
//     singleValue: (provided) => ({
//       ...provided,
//       whiteSpace: 'nowrap',
//       overflow: 'hidden',
//       textOverflow: 'ellipsis',
//       maxWidth: 'calc(100% - 40px)',  
//     })
//   }), []);

//   const handleSelectChange = useCallback((selectedOption) => {
//     sessionStorage.setItem('selectedVendorId', selectedOption ? selectedOption.value : null);
//     setSelectedOption(selectedOption);
//     setDisplayOption(selectedOption); 
//     eventEmitter.emit('vendorSelected', selectedOption.value);
//   }, []);

//   const handleInputChange = useCallback((inputValue, { action }) => {
//     if (action === 'input-change' && inputValue === '') {
//       setDisplayOption(selectedOption); 
//     }
//   }, [selectedOption]);

//   const handleMenuOpen = useCallback(() => {
//     setDisplayOption(null); // Clear displayOption on menu open
//   }, []);

//   return (
//     <>
//       <Box className="accountStyle_icon" sx={{ marginRight: '15px' }}>
//         <IconUser />
//       </Box>
//       <Select
//         value={displayOption}
//         options={options}
//         onChange={handleSelectChange}
//         onInputChange={handleInputChange}
//         onMenuOpen={handleMenuOpen}
//         styles={customStyles}
//         isSearchable
//         placeholder="Select a vendor"
//       />
//     </>
//   );
// };

// export const useSelectedVendorId = () => {
//   return sessionStorage.getItem('selectedVendorId');
// };

// export default CustomSelect;


/*------------------------------------------------------------------- New Code -----------------------------------------------------------------*/


import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Select from 'react-select';
import axios from 'axios';
import '../../../theme/FormStyle.css';
import { IconUser } from '@tabler/icons-react';
import { Box } from '@mui/material';
import config from '../../../../config';
import eventEmitter from '../../../eventEmitter';

const CustomSelect = () => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [displayOption, setDisplayOption] = useState(null);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const BASE_URL = config.UniUrl;

  useEffect(() => {
    const tokenFromStorage = sessionStorage.getItem('token');
    const userIdFromStorage = sessionStorage.getItem('userId');
    if (tokenFromStorage && userIdFromStorage) {
      setToken(tokenFromStorage);
      setUserId(userIdFromStorage);
    } else {
      console.error('Token or userId not found in session storage');
    }
  }, []);

  useEffect(() => {
    const fetchVendors = async () => {
      if (!token || !userId) return;

      console.log('Fetching vendors for userId:', userId); 

      try {
        const response = await axios.get(`${BASE_URL}/overbilling/getAllOverBillingVendors?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.status === 'SUCCESS') {
          const vendorOptions = response.data.data.map(vendor => ({
            value: vendor.vendorId,
            label: vendor.companyName
          }));
          setOptions(vendorOptions);

          if (vendorOptions.length > 0) {
            const defaultVendor = vendorOptions[4] || vendorOptions[0];
            setSelectedOption(defaultVendor);
            setDisplayOption(defaultVendor); 
            sessionStorage.setItem('selectedVendorId', defaultVendor.value);
            sessionStorage.setItem('selectedVendorName', defaultVendor.label); // Store vendor name
            eventEmitter.emit('vendorSelected', defaultVendor.value);
            // eventEmitter.emit('vendorNameSelected', selectedOption.label); 
          }
        } else {
          console.error('Error fetching vendors:', response.data.errorMessage);
        }
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };

    fetchVendors();
  }, [token, userId, BASE_URL]);

  const customStyles = useMemo(() => ({
    control: (provided) => ({
      ...provided,
      paddingLeft: '40px' 
    }),
    input: (provided) => ({
      ...provided,
      marginLeft: '0px' 
    }),
    singleValue: (provided) => ({
      ...provided,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: 'calc(100% - 40px)',  
    })
  }), []);

  const handleSelectChange = useCallback((selectedOption) => {
    sessionStorage.setItem('selectedVendorId', selectedOption ? selectedOption.value : null);
    sessionStorage.setItem('selectedVendorName', selectedOption ? selectedOption.label : null); 
    setSelectedOption(selectedOption);
    setDisplayOption(selectedOption); 
    eventEmitter.emit('vendorSelected', selectedOption.value);
    eventEmitter.emit('vendorNameSelected', selectedOption.label);
  }, []);

  const handleInputChange = useCallback((inputValue, { action }) => {
    if (action === 'input-change' && inputValue === '') {
      setDisplayOption(selectedOption); 
    }
  }, [selectedOption]);

  const handleMenuOpen = useCallback(() => {
    setDisplayOption(null); 
  }, []);

  return (
    <>
      <Box className="accountStyle_icon" sx={{ marginRight: '15px' }}>
        <IconUser />
      </Box>
      <Select
        value={displayOption}
        options={options}
        onChange={handleSelectChange}
        onInputChange={handleInputChange}
        onMenuOpen={handleMenuOpen}
        styles={customStyles}
        isSearchable
        placeholder="Select a vendor"
      />
    </>
  );
};

export const useSelectedVendorId = () => {
  return sessionStorage.getItem('selectedVendorId');
};

export default CustomSelect;





