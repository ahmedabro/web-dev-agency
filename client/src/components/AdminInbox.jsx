import React, { useState, useEffect } from 'react'
import io from 'socket.io-client';

const socket = io.connect(`${import.meta.env.VITE_BACKEND_URL}`); // Adjust the URL as needed

const AdminInbox = () => {
    const [inbox, setInbox] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [text, setText] = useState('');

    useEffect(() => {
        // Listen for inbox updates
        socket.on("admin_inbox", (data) => {
            setInbox(data);
        });

        // Receive messages from rooms admin has joined
        socket.on("receive_message", (msg) => {
            if (msg.room === selectedRoom) {
                setMessages((prev) => [...prev, msg]);
            }
        });

        return () => {
            socket.off("admin_inbox");
            socket.off("receive_message");
        };
    }, [selectedRoom]);

    const openChat = (roomEmail) => {
        setSelectedRoom(roomEmail);
        setMessages([]); // Clear previous messages

        socket.emit('join_room', {
            email: roomEmail,
            isAdmin: true,
            name: 'Admin'
        });
    }

    const sendMessage = () => {
        if (!text.trim() || !selectedRoom) return;
        const messagePayload = {
            room: selectedRoom,
            sender: 'Admin',
            text: text
        };
        socket.emit('send_message', messagePayload);

        setText("");
    }

    return (
        <div className='flex gap-5'>
            {/* Inbox Left Panel */}
            <div className='w-1/3'>
                <h3>Inbox</h3>

                {inbox.map((u) => (
                    <div
                        key={u.email}
                        onClick={() => openChat(u.email)}
                        className='p-2 border-b cursor-pointer hover:bg-gray-100'
                    >
                        <strong>{u.name}</strong>
                        <div className='text-xs'>{u.email}</div>
                    </div>
                ))}
            </div>

            {/* Chat Window Right Panel */}
            <div className='w-2/3'>
                {selectedRoom ? (
                    <>
                        <h3>Chat with: {selectedRoom}</h3>

                        <div
                            style={{
                                height: 350,
                                overflowY: "scroll",
                                border: "1px solid #ddd",
                                padding: 10,
                                marginBottom: 10,
                            }}
                        >
                            {messages.map((m, i) => (
                                <div
                                    key={i}
                                    style={{
                                        marginBottom: 8,
                                        textAlign: m.sender === 'Admin' ? "right" : "left",
                                    }}
                                >
                                    <strong>{m.sender}: </strong>
                                    {m.text}
                                </div>
                            ))}
                        </div>

                        <div style={{ display: "flex", gap: 8 }}>
                            <input
                                style={{ flex: 1 }}
                                placeholder="Type message..."
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                            <button onClick={sendMessage}>Send</button>
                        </div>
                    </>
                ) : (
                    <h3>Select a user from inbox</h3>
                )}
            </div>
        </div>
    )
}

export default AdminInbox
