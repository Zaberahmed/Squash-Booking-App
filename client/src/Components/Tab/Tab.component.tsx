import React, { useEffect, useState } from 'react';
import authJWT from './../../Services/UserJWT.service';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PastEvents from '../History/PastEvents';
import UpcomingEvents from '../Upcoming/UpcomingEvents';
const TabComponent = () => {
  const formatTime = (timeString: string): string => {
    const time = timeString.toLowerCase();
    const hour = time.substring(0, time.length - 2);
    const period = time.substring(time.length - 2);

    let formattedHour = parseInt(hour, 10);
    if (formattedHour < 10) {
      formattedHour = 0 + formattedHour;
    }

    return `${formattedHour}:00 ${period.toUpperCase()}`;
  };
  // const location = useLocation()
  // const {past,upComing} =location.state;
  const [value, setValue] = React.useState('2');
  const [bookings, setBookings] = useState<any[]>([]);
  const today = new Date().toISOString();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await authJWT.bookingsList();
        console.log(result);
        setBookings(result);
      } catch (error) {
        // Handle error
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const filterBookings = (booking: any) => {
    const bookingTime = new Date(booking.date).toISOString();
    return bookingTime >= today;
  };
  const pastBookings = bookings.filter((booking) => !filterBookings(booking));
  const upComingBookings = bookings.filter(filterBookings);
  // console.log(upComingBookings);
  // console.log(pastBookings);

  return (
    <div>
      <Box sx={{ width: '100%', typography: 'body1', marginTop: '' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label='lab API tabs example'>
              <Tab label='Past' value='1' />
              <Tab label='Upcoming' value='2' />
            </TabList>
          </Box>
          <TabPanel value='1'>
            <div className=''>
              {pastBookings.map(
                (booking: { id: React.Key | null | undefined }) => (
                  <PastEvents key={booking.id} booking={booking} />
                )
              )}
            </div>
          </TabPanel>
          <TabPanel value='2'>
            <div className=''>
              {upComingBookings.map(
                (booking: { id: React.Key | null | undefined }) => (
                  <UpcomingEvents key={booking.id} booking={booking} />
                )
              )}
            </div>
          </TabPanel>
        </TabContext>
      </Box>

      {/* {value && 
       (
       
        
     
       )
      } */}
    </div>
  );
};

export default TabComponent;
