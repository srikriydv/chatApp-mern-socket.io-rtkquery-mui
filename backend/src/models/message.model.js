import mongoose from "mongoose";
const { Schema } = mongoose;


const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    reciever:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
    }
}, {
    timestamps: true,
});

const Message = mongoose.model("Message", messageSchema);

export default Message;