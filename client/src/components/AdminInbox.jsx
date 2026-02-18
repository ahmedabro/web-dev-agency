import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect(`${import.meta.env.VITE_BACKEND_URL}`);

const AdminInbox = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // 1) On mount: join admins room + load all conversations from DB
  useEffect(() => {
    socket.emit("join_room", { email: "admin", name: "Admin", isAdmin: true });

    const loadConversations = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/chat/conversations`
      );
      const data = await res.json();
      setConversations(Array.isArray(data) ? data : []);
    };

    loadConversations();
  }, []);

  // 2) Real-time inbox preview update when ANY message comes in
  useEffect(() => {
    const handleAdminMsg = (msg) => {
      if (!msg?.room) return;

      // Update conversation list: move room to top + update preview
      setConversations((prev) => {
        const filtered = prev.filter((c) => c.room !== msg.room);
        const updated = {
          room: msg.room,
          lastMessage: msg.text,
          lastSender: msg.sender,
          lastMessageAt: msg.createdAt || new Date().toISOString(),
        };
        return [updated, ...filtered];
      });

      // If admin is viewing this room, DO NOT append here (avoid duplicates)
      // receive_message will handle it
    };

    socket.on("admin_receive_message", handleAdminMsg);
    return () => socket.off("admin_receive_message", handleAdminMsg);
  }, [selectedRoom]);

  // 3) Room live messages (only for the open room)
  useEffect(() => {
    const handleRoomMsg = (msg) => {
      if (!msg?.room) return;
      if (msg.room !== selectedRoom) return;
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("receive_message", handleRoomMsg);
    return () => socket.off("receive_message", handleRoomMsg);
  }, [selectedRoom]);

  const openChat = async (roomEmail) => {
    setSelectedRoom(roomEmail);

    socket.emit("join_room", {
      email: roomEmail,
      isAdmin: true,
      name: "Admin",
    });

    // fetch history
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/chat/history/${encodeURIComponent(
        roomEmail
      )}?limit=200`
    );
    const data = await res.json();
    setMessages(Array.isArray(data) ? data : []);
  };

  const sendMessage = () => {
    if (!text.trim() || !selectedRoom) return;

    socket.emit("send_message", {
      room: selectedRoom,
      sender: "Admin",
      text,
    });

    setText("");
  };

  return (
    <div className="flex gap-5">
      {/* Left: Conversations */}
      <div className="w-1/3">
        <h3>Conversations</h3>

        {conversations.map((c) => (
          <div
            key={c.room}
            onClick={() => openChat(c.room)}
            className="p-2 border-b cursor-pointer hover:bg-gray-100"
          >
            <strong>{c.room}</strong>
            <div className="text-xs">
              {c.lastSender}: {c.lastMessage}
            </div>
            <div className="text-[10px] opacity-70">
              {c.lastMessageAt ? new Date(c.lastMessageAt).toLocaleString() : ""}
            </div>
          </div>
        ))}
      </div>

      {/* Right: Chat */}
      <div className="w-2/3">
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
              {messages.map((m) => (
                <div
                  key={m._id || `${m.sender}-${m.createdAt}-${m.text}`}
                  style={{
                    marginBottom: 8,
                    textAlign: m.sender === "Admin" ? "right" : "left",
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
          <h3>Select a conversation</h3>
        )}
      </div>
    </div>
  );
};

export default AdminInbox;