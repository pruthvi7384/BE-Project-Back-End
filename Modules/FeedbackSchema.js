import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
    user_id:{
        type: String,
        required: true,
        default: 'NA'
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
    },
    status:{
        type: Boolean,
        required: true,
        default: false
    }
})

const Feedback = mongoose.model('Feedback',FeedbackSchema);

export default Feedback;