import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {// Schema for the message model
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",//sender-id is going to be the reference to the User model
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;

//sender and receiver both will be user