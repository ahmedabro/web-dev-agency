import { use } from 'react';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect(`${import.meta.env.VITE_BACKEND_URL}`); // Adjust the URL as needed

const LiveChat = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [joined, setJoined] = useState(false);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');


    const sendMessage = () => {
        if (!newMessage.trim()) return;
        const messagePayload = {
            room: userEmail,
            sender: userName,
            text: newMessage
        };
        socket.emit('send_message', messagePayload);
    }

    const joinRoom = () => {
        if (!userEmail || !userName) {
            alert("Please enter both email and name to join the chat.");
            return;
        }

        const joinPayload = { email: userEmail, name: userName, isAdmin: false };

        socket.emit('join_room', joinPayload);

        setJoined(true);
    }

    useEffect(() => {
        const handleReceive = (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        };
        
        socket.on('receive_message', handleReceive);

        return () => {
            socket.off("receive_message", handleReceive);
        };
    }, [socket]);

    return (
        <div className="main-chat-window">
            {!joined ? (
                <div className='join-chat-container'>
                    <input type="email" placeholder='Enter your email...' value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                    <input type="name" placeholder='Enter your name...' value={userName} onChange={(e) => setUserName(e.target.value)} />
                    <button onClick={() => joinRoom(userEmail)}>Start Chat</button>
                </div>
            ) : (
                <div className='chat-container'>
                    <div className='messages-container'>
                        {messages.map((msg, index) => (
                            <div key={index}>
                                <strong>{msg.sender}:</strong> {msg.text}
                            </div>
                        ))}
                    </div>
                    <input type="text" placeholder='Type your message...' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                    <button onClick={sendMessage}>Send</button>
                </div>
            )}

        </div>
    )
}

export default LiveChat
