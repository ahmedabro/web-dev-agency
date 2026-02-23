import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { GrChat } from "react-icons/gr";

const socket = io.connect(`${import.meta.env.VITE_BACKEND_URL}`); // Adjust the URL as needed

const LiveChat = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [joined, setJoined] = useState(false);

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');

    const [chatOpened, setChatOpened] = useState(false);

    const sendMessage = () => {
        if (!text.trim()) return;
        const messagePayload = {
            room: userEmail,
            sender: userName,
            text: text
        };
        socket.emit('send_message', messagePayload);
        setText("");
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
        const handleReceive = (msg) => {
            if (!msg?.room) return;
            if (msg.room !== userEmail) return; // only this user's room
            setMessages((prev) => [...prev, msg]);
        };

        socket.on("receive_message", handleReceive);

        return () => {
            socket.off("receive_message", handleReceive);
        };
    }, [userEmail]);

    useEffect(() => {
        if (!joined || !userEmail) return;

        const loadHistory = async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/chat/history/${encodeURIComponent(userEmail)}?limit=100`
            );
            const data = await res.json();
            setMessages(
                data.map((m) => ({
                    room: m.room,
                    sender: m.sender,
                    text: m.text,
                    timestamp: m.createdAt,
                    _id: m._id,
                }))
            );
        };

        loadHistory();
    }, [joined, userEmail]);

    return (
        <div className='fixed right-5 bottom-5 z-99'>
            <div className="chat-icon absolute bottom-0 right-0 z-99 w-44 h-15 rounded-full bg-dark-primary flex justify-center items-center gap-3 cursor-pointer" onClick={() => setChatOpened(!chatOpened)}>
                <GrChat className='text-black text-xl' /> <span>Chat with me</span>
            </div>
            {chatOpened && (
                <div className="main-chat-window absolute bottom-17 right-0 w-100 h-120 bg-dark-surface overflow-hidden shadow-lg border-dark-primary border-1 rounded-lg">
                    {!joined ? (
                        <div className='join-chat-container contact-section w-full h-full flex flex-col justify-center items-center p-4'>
                            <input type="email" className='border-gray-500 focus:border-dark-primary' placeholder='Enter your email...' value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                            <input type="name" className='border-gray-500 focus:border-dark-primary' placeholder='Enter your name...' value={userName} onChange={(e) => setUserName(e.target.value)} />
                            <button onClick={() => joinRoom(userEmail)} className='group mt-4 theme-button !h-fit !w-fit py-4 px-10'>Start Chat</button>
                        </div>
                    ) : (
                        <div className='chat-container w-full h-full flex flex-col justify-between'>
                            <div className='messages-container p-4'>
                                {messages.map((msg, index) => (
                                    <div key={index} className={`${msg.sender === userName ? 'my-message text-right' : 'other-message text-left'}`}>
                                        <strong>{msg.sender}:</strong> {msg.text}
                                    </div>
                                ))}
                            </div>
                            <div className='message-input-container flex justify-between gap-3 bg-dark-background py-2 px-4'>
                                <input type="text" className='w-full focus:outline-0' placeholder='Type your message...' value={text} onChange={(e) => setText(e.target.value)} />
                                <button className='w-fit theme-button !h-fit !w-fit py-2 px-4' onClick={sendMessage}>Send</button>
                            </div>
                        </div>
                    )}

                </div>
            )}
        </div>
    )
}

export default LiveChat
