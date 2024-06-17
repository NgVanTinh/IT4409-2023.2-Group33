import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Grid } from '@mui/material';
import { ListItem, Paper } from '@mui/material';
import TopHeader from "../../components/TopHeader";
import { Box, Typography } from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const ChatApp = () => {
  const navigate = useNavigate();
  const [conversations, setConversation] = useState([]);

  const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  };

  const loadData = () => {
    axios.get(`https://buckytank.shop/users`, config)
    .then((res) => {
      const data = res.data.filter(item => item.id !== 1);
      setConversation(data);
    })
    .catch((err) => {console.log(err)});
  }

  useEffect(() =>{
    loadData();
  },[]);

  return (
    <>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <TopHeader title="TIN NHẮN" subtitle="Trao đổi thông tin, giải đáp thắc mắc cùng người dùng" />
        </Box>
        <Box>
          <div style={{ padding: '20px', maxheight: '70vh', overflowY: 'auto'}}>
            <Grid container style={{ height: '100%' }}>
              {conversations.map((conversation) => (
                <Grid item xs={12} key={conversation.id}>
                  <ListItem 
                    button 
                    sx={{ 
                      borderRadius: '10px', 
                      margin: '1px 0', 
                      padding: '15px' 
                    }}
                    onClick={() => navigate(`/admin/messages/${conversation.id}`)}
                  >
                    <AccountCircleOutlinedIcon 
                      style={{ 
                        fontSize: '50px', 
                        color: 'grey', 
                        marginRight: '10px' 
                      }} 
                    />
                    <Typography 
                      variant="h6" 
                      style={{ 
                        textAlign: 'left', 
                        marginTop: '5px', 
                        color: 'grey'
                      }}
                    >
                      {conversation.username}
                    </Typography>
                  </ListItem>
                </Grid>
              ))}
            </Grid>
          </div>
        </Box>
        
    </>
    
  );
}

export default ChatApp;

