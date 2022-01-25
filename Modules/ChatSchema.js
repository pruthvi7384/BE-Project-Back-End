import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    user_id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    timestamp:{
        type: String,
        required: true
    }
});

const Chat = mongoose.model('Chats',chatSchema);

export default Chat