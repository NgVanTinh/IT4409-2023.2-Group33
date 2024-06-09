import React from 'react'
import { useState } from 'react';
import { Box, Typography } from "@mui/material";
import TopHeader from '../../components/TopHeader'
import PieChart from "../../components/PieChart";
import LineChart from "../../components/LineChart";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';

const Chart = () => {
  const [value, setValue] = useState('1');
  // const [category, setCategory] = useState([]);

  // useEffect(() => {
  //   loadValue();
  // }, []);

  // const loadCategories = async () => {
  //   try {
  //     const result = await axios.get(`https://dummyjson.com/carts`);
  //     setCategories(result.data);
  //   } catch (error) {
  //     console.error('Error loading categories:', error);
  //   }
  // };
  const categories = [
    {
      title: 'Category 1',
    },
    {
      title: 'Category 2',
    },
    {
      title: 'Category 3',
    },
    {
      title: 'Category 4',
    }
  ];  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <TopHeader title="STATISTICS" subtitle="Statistics" />

      {/* <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      > */}
          <Box
            gridColumn="span 5"
            gridRow="span 2"
            // backgroundColor='#9C9C9C'
            p="30px"
          >
            <Typography variant="h5" fontWeight="600">
              Campaign
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
              <PieChart/>
            </Box>
          </Box>

          <Box
            gridColumn="span 7"
            gridRow="span 2"
            // backgroundColor='#9C9C9C'
          >
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  {categories.map((category, index) => (
                    <Tab key={index} label={category.title} value={String(index + 1)} />
                  ))}
                </TabList>
              </Box>
              {categories.map((item, index) => (
                    <TabPanel value={String(index + 1)} ><LineChart category={value}/></TabPanel>
                  ))}
              {/* <TabPanel value="1"><LineChart/></TabPanel>
              <TabPanel value="2"><LineChart/></TabPanel>
              <TabPanel value="3"><LineChart/></TabPanel> */}
            </TabContext>
          </Box>
    </div>
  )
}

export default Chart