import { Typography, Box } from "@mui/material";

const TopHeader = ({ title, subtitle }) => {
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
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