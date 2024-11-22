import React, { useEffect, useState, useRef } from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Button
} from '@mui/material';
import { io } from 'socket.io-client';
import Navbar from './Navbar';
import { useGetUsersQuery, useGetMessagesQuery } from '../features/messages/messsageApiSlice';
import { useCheckUserQuery } from '../features/api/baseApiSlice';

const HomePage = () => {
    const [messages, setMessages] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [messageText, setMessageText] = useState('');
    const [socket, setSocket] = useState(null);
    const messagesEndRef = useRef(null); // Reference for auto-scrolling

    // Fetch users
    const { data: users } = useGetUsersQuery();
    const { data: userData } = useCheckUserQuery();
    const { data: messagesData } = useGetMessagesQuery(selectedUserId, { skip: !selectedUserId });

    // Initialize Socket
    useEffect(() => {
        const newSocket = io("http://localhost:3000", {
            withCredentials: true, // Allow cross-origin cookies
        });
        setSocket(newSocket);

        return () => {
            newSocket.disconnect(); // Cleanup on unmount
        };
    }, [userData]);

    // Join room when a user is selected
    useEffect(() => {
        if (socket && selectedUserId) {
            socket.emit('joinRoom', {
                senderId: userData?.user?._id,
                receiverId: selectedUserId,
            });
        }
    }, [socket, selectedUserId, userData]);

    // Listen for incoming messages
    useEffect(() => {
        if (socket) {
            socket.on('receiveMessage', (newMessage) => {
                setMessages((prev) => [...prev, newMessage]);
            });
        }
    }, [socket]);

    // Fetch initial messages
    useEffect(() => {
        if (messagesData) setMessages(messagesData);
    }, [messagesData]);

    // Scroll to the latest message
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = () => {
        if (!messageText.trim()) return;

        const newMessage = {
            senderId: userData?.user?._id,
            receiverId: selectedUserId,
            message: messageText,
        };

        // Send message to backend and socket
        socket.emit('sendMessage', newMessage);
        // setMessages((prev) => [...prev, { ...newMessage, sender: userData?.user?._id }]);
        setMessageText('');
    };

    return (
        <>
            <Navbar />
            <Container maxWidth="lg" style={{ height: '80vh', display: 'flex', padding: 0 }}>
                <Grid container style={{ flexGrow: 1 }}>
                    {/* Left Section: User List */}
                    <Grid item xs={4} style={{ height: '80vh', overflowY: 'auto', backgroundColor: '#f5f5f5', padding: '16px' }}>
                        <List>
                            {users?.map((user) => (
                                <ListItem
                                button
                                onClick={() => setSelectedUserId(user._id)}
                                key={user._id}
                                style={{
                                    marginBottom: '16px',
                                    backgroundColor: selectedUserId === user._id ? '#e0e0e0' : 'transparent', // Change color on selection
                                    borderRadius: '8px',
                                }}
                            >
                                    <ListItemAvatar>
                                        <Avatar alt={user.name} />
                                    </ListItemAvatar>
                                    <ListItemText primary={user.name} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>

                    {/* Right Section: Chat Window */}
                    <Grid item xs={8} style={{ height: '80vh', overflowY: 'auto', backgroundColor: '#ffffff', padding: '16px' }}>
                        <Box style={{ height: '65vh', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
                            {messages.map((msg, index) => (
                                <Box
                                    key={index}
                                    style={{
                                        marginBottom: '16px',
                                        textAlign: msg.sender === userData?.user?._id ? 'right' : 'left',
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        style={{
                                            display: 'inline-block',
                                            padding: '8px 12px',
                                            backgroundColor: msg.sender === userData?.user?._id ? '#d1e7dd' : '#f0f0f0',
                                            borderRadius: '8px',
                                        }}
                                    >
                                        {msg.message}
                                    </Typography>
                                </Box>
                            ))}
                            {/* Dummy div for auto-scrolling */}
                            <div ref={messagesEndRef} />
                        </Box>

                        {/* Message Input */}
                        <Box style={{ marginTop: '10px', display: 'flex' }}>
                            <TextField
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault(); // Prevent newline in input
                                        sendMessage();
                                    }
                                }}
                                variant="outlined"
                                fullWidth
                                placeholder="Type a message"
                                style={{ marginRight: '8px' }}
                            />
                            <Button onClick={sendMessage} variant="contained" color="primary" style={{ padding: '10px' }}>
                                Send
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default HomePage;