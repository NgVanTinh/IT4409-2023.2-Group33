import React, { useState, useEffect, useRef } from 'react';
import { Grid, Paper, TextField, IconButton, Typography, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useParams } from 'react-router';
import TopHeader from "./TopHeader";
import SockJS from 'sockjs-client';
import  Stomp from 'stompjs';

const PM = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const { id } = useParams();
    const bottomRef = useRef(null);

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };

    const loadMessage = async () => {
        const result = await axios.get(`https://buckytank.shop/messages?userId=${id}`, config);
        const message = result.data;
        // console.log(message);
        if (message.length > 0) {
            const mess = result.data[0];
            const userid = mess.receiverId !== 1 ? mess.receiverId : mess.senderId;
            const client = await axios.get(`https://buckytank.shop/user/${userid}`, config);
            const user = client.data.username;

            message.forEach(mes => {
                if (mes.senderId === 1) {
                    mes.sender = 'Admin';
                } else {
                    mes.sender = user;
                }
            });
            setMessages(result.data);
        }
    };

    useEffect(() => {
        loadMessage();
    }, []);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const [stompClient, setStompClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socket = new SockJS('https://buckytank.shop/ws');
        const client = Stomp.over(socket);

        client.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            setIsConnected(true);
            client.subscribe(`/user/${id}/queue/messages`, (chatMessage) => {
                showMessage(JSON.parse(chatMessage.body));
            });
        }, (error) => {
            console.log('STOMP error: ' + error);
            setIsConnected(false);
        });

        setStompClient(client);

        return () => {
            if (client) {
                client.disconnect(() => {
                    console.log('Disconnected');
                });
            }
        };
    }, [id]);

    const showMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleSendMessage = () => {
        if (inputValue.trim() === '' || !isConnected) return;
        const receiverId = id; 
        const message = {
            content: inputValue,
            senderId: 1, 
            receiverId: receiverId
        };
        if (stompClient && isConnected) {
            stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(message));
            setInputValue('');
        } else {
            console.log('Unable to send message: Not connected');
        }
    };

    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <TopHeader title="TIN NHẮN" subtitle="Trao đổi thông tin, giải đáp thắc mắc cùng người dùng" />
            </Box>
            <Grid container style={{ height: '60vh' }} justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={12} md={12}>
                    <Paper elevation={3} style={{ padding: '20px', height: '74vh', overflowY: 'auto' }}>
                        {messages.length > 0 ? (
                            messages.map((message) => (
                                <div key={message.id} style={{ display: 'flex', justifyContent: message.sender === 'Admin' ? 'flex-end' : 'flex-start', marginBottom: '1px' }}>
                                    <div style={{ maxWidth: '50%', minWidth: '30%', padding: '10px', borderRadius: '10px', backgroundColor: '#5BBBFB', wordWrap: 'break-word' }}>
                                        <Typography variant="body1" sx={{ fontSize: '15px' }}>
                                            <strong>{message.sender}</strong>:
                                            <span style={{ fontSize: '13px' }}> {message.content}</span>
                                        </Typography>
                                        <Typography variant="caption" style={{ textAlign: 'right' }}>{message.time}</Typography>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Typography variant='h6'>Chưa có tin nhắn nào</Typography>
                        )}
                        <div ref={bottomRef} />
                    </Paper>
                    <Grid container alignItems="center" style={{ marginTop: '20px' }}>
                        <Grid item xs={11}>
                            <TextField
                                placeholder="Type your message here..."
                                fullWidth
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={1} style={{ textAlign: 'left' }}>
                            <IconButton color="primary" onClick={handleSendMessage}>
                                <SendIcon sx={{ fontSize: '35px' }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default PM;
