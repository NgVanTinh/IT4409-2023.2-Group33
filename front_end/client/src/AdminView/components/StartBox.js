import { Box, Typography } from "@mui/material";

const StatBox = ({ title, subtitle, icon }) => {

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: 'grey' }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: 'blue' }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;