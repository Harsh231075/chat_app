import Conversation from '../model/conservationModel.js';
import Message from '../model/messageModel.js';
import { getReceiverSocketId, getIO } from '../sokect/socket.js'; 

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    const senderId = req.id;

    const message = await Message.create({
      receiverId,
      senderId,
      content
    });

    let conversation = await Conversation.findOne({
      praticipaints: { $all: [receiverId, senderId] }
    });

    if (conversation) {
      conversation.message.push(message._id);
      await conversation.save();
    } else {
      conversation = await Conversation.create({
        praticipaints: [senderId, receiverId],
        message: [message._id]
      });
    }

    const receiverSocketId = getReceiverSocketId(receiverId);
    const io = getIO(); // <-- get io instance
// console.log("receiverSocketId =>",receiverSocketId);
    if (receiverSocketId) {
      // console.log("socket =>",message);
      io.to(receiverSocketId).emit("newMessage", message);
    }

    return res.status(201).json({ message: "Message sent successfully", message });
  } catch (error) {
    console.error("Conversation Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


export const getAllMessage = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const senderId = req.id;

    const conversation = await Conversation.findOne({
      praticipaints: { $all: [receiverId, senderId] }
    }).populate({
      path: 'message',
      populate: [
        { path: 'senderId', select: 'name _id' },
        { path: 'receiverId', select: 'name _id' }
      ]
    });

    if (!conversation) {
      return res.status(404).json({ message: 'No conversation found' });
    }

    res.status(200).json({ message: "Messages fetched successfully", conversation });

  } catch (error) {
    console.error("getAllMessage Error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

