// import React, { useState, useEffect } from 'react';
// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';

// const BASE_URL = 'https://buckytank.shop/ws';

// function App() {
//   const [userId, setUserId] = useState(null);
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [stompClient, setStompClient] = useState(null);

//   useEffect(() => {
//     if (userId !== null) {
//       connect();
//     }
//   }, [userId]);

//   const connect = () => {
//     const socket = new SockJS(BASE_URL);
//     const client = Stomp.over(socket);

//     client.connect({}, (frame) => {
//       console.log('Connected: ' + frame);
//       client.subscribe(`/user/${userId}/queue/messages`, (chatMessage) => {
//         showMessage(JSON.parse(chatMessage.body));
//       });
//     }, (error) => {
//       console.log('STOMP error: ' + error);
//     });

//     setStompClient(client);
//   };

//   const sendMessage = () => {
//     if (!stompClient) return;

//     const receiverId = userId === 1 ? 2 : 1; // Assuming user 2 as the receiver
//     const messageObj = {
//       content: message,
//       senderId: userId,
//       receiverId: receiverId,
//     };

//     stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(messageObj));
//     setMessage('');
//   };

//   const showMessage = (message) => {
//     setMessages((prevMessages) => [...prevMessages, message]);
//   };

//   const handleLogin = () => {
//     const id = parseInt(document.getElementById('userIdInput').value);
//     setUserId(id);
//   };

//   return (
//     <div className="App">
//       {userId === null ? (
//         <div id="login">
//           <label htmlFor="userIdInput">Enter User ID:</label>
//           <input type="number" id="userIdInput" name="userId" />
//           <button onClick={handleLogin}>Login</button>
//         </div>
//       ) : (
//         <div id="chat">
//           <h1>Chat Application</h1>
//           <ul id="messageArea">
//             {messages.map((msg, index) => (
//               <li key={index}>{msg.senderId}: {msg.content}</li>
//             ))}
//           </ul>
//           <input
//             type="text"
//             id="message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type a message..."
//           />
//           <button onClick={sendMessage}>Send</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
