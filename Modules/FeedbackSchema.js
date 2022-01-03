import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
    user_id:{
        type: String,
        required: false
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    feedback:{
        type: String,
        required: true
    },
    feedback_date:{
        type: Date,
        required: true,
        default: Date.now
    }
})