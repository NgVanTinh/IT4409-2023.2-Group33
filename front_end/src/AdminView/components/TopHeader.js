import { Typography, Box } from "@mui/material";
import "../Admin.css"
const TopHeader = ({ title, subtitle }) => {
  return (
    <Box mb="20px">
      <Typography
        variant="h3"
        color='grey'
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color='blue'>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default TopHeader;