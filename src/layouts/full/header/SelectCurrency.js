/*--------------------------------------------------------------- Currency Code -------------------------------------------------------*/

// import React, { useEffect, useState, useCallback } from 'react';
// import Select from 'react-select';
// import { IconUser } from '@tabler/icons-react';
// import axios from 'axios';
// import '../../../theme/FormStyle.css';
// import eventEmitter from '../../../eventEmitter';

// const SelectCurrency = () => {
//   const [currencyOptions, setCurrencyOptions] = useState([]);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedVendorId, setSelectedVendorId] = useState(sessionStorage.getItem('selectedVendorId'));

//   const fetchCurrencyOptions = useCallback(async (vendorId) => {
//     try {
//       const token = sessionStorage.getItem('token');

//       if (!vendorId) {
//         console.warn('No selectedVendorId found, cannot fetch currency options.');
//         return;
//       }

//       setLoading(true); // Set loading to true before fetching new options

//       const response = await axios.get(`http://16.170.22.123:8082/overbilling/getCurrencyDD?vendorId=${vendorId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const options = response.data.data.map(currency => ({
//         value: currency,
//         label: currency,
//         icon: <IconUser />,
//       }));

//       setCurrencyOptions(options);
//       setSelectedOption(options[0] || null); // Automatically select the first option if available
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching currency options:', error);
//       setLoading(false); // Set loading to false if there's an error
//     }
//   }, []);

//   useEffect(() => {
//     if (selectedVendorId) {
//       fetchCurrencyOptions(selectedVendorId);
//     }

//     const handleVendorSelected = (newVendorId) => {
//       sessionStorage.setItem('selectedVendorId', newVendorId); // Update session storage
//       setSelectedVendorId(newVendorId); // Update state which will trigger useEffect
//     };

//     eventEmitter.on('vendorSelected', handleVendorSelected);

//     return () => {
//       eventEmitter.off('vendorSelected', handleVendorSelected);
//     };
//   }, [selectedVendorId, fetchCurrencyOptions]);

//   return (
//     <Select
//       value={selectedOption} 
//       onChange={setSelectedOption} 
//       options={currencyOptions}
//       className="select-currency"
//       isLoading={loading}
//       isDisabled={loading}
//       styles={{
//         placeholder: (provided) => ({
//           ...provided,
//           color: 'white', 
//         }),
//       }}
//     />
//   );
// };

// export default SelectCurrency;


/*--------------------------------------------------------------- Current Code ------------------------------------------------------------*/



import React, { useEffect, useState, useCallback } from 'react';
import Select from 'react-select';
import { IconUser } from '@tabler/icons-react';
import axios from 'axios';
import '../../../theme/FormStyle.css';
import eventEmitter from '../../../eventEmitter';

const SelectCurrency = () => {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placeholder, setPlaceholder] = useState('Select...');
  const [selectedVendorId, setSelectedVendorId] = useState(sessionStorage.getItem('selectedVendorId'));

  const fetchCurrencyOptions = useCallback(async (vendorId) => {
    const token = sessionStorage.getItem('token');
    if (!vendorId) {
      console.warn('No selectedVendorId found, cannot fetch currency options.');
      setPlaceholder('Currency'); 
      setCurrencyOptions([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setPlaceholder('Select...'); 

      const response = await axios.get(`http://16.170.22.123:8082/overbilling/getCurrencyDD?vendorId=${vendorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.data && response.data.data.length > 0) {
        const options = response.data.data.map(currency => ({
          value: currency,
          label: currency,
          icon: <IconUser />,
        }));

        setCurrencyOptions(options);
        setSelectedOption(options[0] || null);
      } else {
        setPlaceholder('Currency'); 
        setCurrencyOptions([]);
        setSelectedOption(null);
      }
    } catch (error) {
      console.error('Error fetching currency options:', error);
      setPlaceholder('Currency'); 
      setCurrencyOptions([]);
      setSelectedOption(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrencyOptions(selectedVendorId);

    const handleVendorSelected = (newVendorId) => {
      sessionStorage.setItem('selectedVendorId', newVendorId); 
      setSelectedVendorId(newVendorId); 
      setCurrencyOptions([]); 
      setSelectedOption(null); 
      setPlaceholder('Select...'); 
      setLoading(true); 
    };

    eventEmitter.on('vendorSelected', handleVendorSelected);

    return () => {
      eventEmitter.off('vendorSelected', handleVendorSelected);
    };
  }, [selectedVendorId, fetchCurrencyOptions]);

  return (
    <Select
      value={selectedOption} 
      onChange={setSelectedOption} 
      options={currencyOptions}
      className="select-currency"
      isLoading={loading}
      isDisabled={loading}
      placeholder={placeholder} 
      styles={{
        placeholder: (provided) => ({
          ...provided,
          color: 'white', 
        }),
      }}
    />
  );
};

export default SelectCurrency;
