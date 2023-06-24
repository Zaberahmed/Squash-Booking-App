import React, { useEffect } from 'react';
import authJWT from '../../Services/authJWT.service';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
const TabComponent = () => {

    const [value, setValue] = React.useState('2');
    const [bookings,setBookings] = React.useState('');
    const bookingsCheck = [
      {
        date: '2023-06-25T08:30:00.000Z',
      },
      {
        date: '2023-06-26T08:30:00.000Z',
      },
      {
        date: '2023-06-22T08:30:00.000Z',
      }
    ]

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);

      useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await authJWT.bookings();
				console.log(result);
				setBookings(result);
			} catch (error) {
				// Handle error
				console.log(error);
			}
		};

		fetchData();
	}, []);
    };
  
    return (
        <div>
     <Box sx={{ width: '100%', typography: 'body1',marginTop:'-22rem' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Past" value="1" />
            <Tab label="Upcoming" value="2" />
           </TabList>
        </Box>
        <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
      
      </TabContext>
    </Box>


 

    {/* { value &&

        bookings.map((booking)=>{

        })
    } */}
        </div>
    );
};

export default TabComponent;