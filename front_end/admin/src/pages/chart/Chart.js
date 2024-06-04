import React from 'react'
import { Box, Typography } from "@mui/material";
import TopHeader from '../../components/TopHeader'
import PieChart from "../../components/PieChart";
import LineChart from "../../components/LineChart";
const Chart = () => {
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
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: "30px 30px 0 30px" }}
            >
              Sales Quantity
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
              <LineChart/>
            </Box>
          </Box>
      {/* </Box> */}
    </div>
  )
}

export default Chart