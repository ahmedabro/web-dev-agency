import Message from "../models/messageModel.js";

export const fetchChatHistory = async (req, res) => {
  try {
    const { room } = req.params;
    const limit = Math.min(parseInt(req.query.limit || "50", 10), 200);

    const messages = await Message.find({ room })
      .sort({ createdAt: 1 }) // oldest -> newest
      .limit(limit);

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to load history" });
  }
};

export const fetchConversations = async (req, res) => {
  try {
    const conversations = await Message.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$room",
          lastMessage: { $first: "$text" },
          lastSender: { $first: "$sender" },
          lastMessageAt: { $first: "$createdAt" },
        },
      },
      { $sort: { lastMessageAt: -1 } },
    ]);

    res.json(
      conversations.map((c) => ({
        room: c._id,
        lastMessage: c.lastMessage,
        lastSender: c.lastSender,
        lastMessageAt: c.lastMessageAt,
      }))
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load conversations" });
  }
}