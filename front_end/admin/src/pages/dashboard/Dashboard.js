import { Box, Button, Typography } from "@mui/material";

import TopHeader from "../../components/TopHeader";
import StatBox from "../../components/StartBox";
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import { ProductOutlined, UserOutlined, OrderedListOutlined } from '@ant-design/icons'
import PieChart from "../../components/PieChart";
import LineChart from "../../components/LineChart";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <Box m="20px">

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <TopHeader title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 3"
          backgroundColor='#9C9C9C'
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12,361"
            subtitle="Users"
            icon={
              <UserOutlined
                style={{ color: 'blue', fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor='#9C9C9C'
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="431,225"
            subtitle="Products"
            icon={
              <ProductOutlined
                style={{ color: 'blue', fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor='#9C9C9C'
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            
            title="32,441"
            subtitle="Orders"
            icon={
              <OrderedListOutlined
                style={{ color: 'blue', fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor='#9C9C9C'
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box width="100%" m="0 30px">
            <Box display="flex" justifyContent="space-between">
              <Box>
                <CelebrationOutlinedIcon
                  style={{ color: 'blue', fontSize: "35px" }}
                />
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ color: 'white' }}
                >
                  Iphone Xs Max
                </Typography>
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="2px">
              <Typography variant="h5" sx={{ color: 'blue' }}>
                Best Seller
              </Typography>
            </Box>
          </Box>
        </Box>

        
        <Box
          gridColumn="span 5"
          gridRow="span 2"
          backgroundColor='#9C9C9C'
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
          backgroundColor='#9C9C9C'
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
      </Box> 
    </Box>
  );
};

export default Dashboard;