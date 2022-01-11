import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    user_id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    answer:{
        type: String,
        required: true,
        default: 'NA'
    },
    answer_date:{
        type: String,
        required: true,
        default: 'NA'
    },
    contact_date:{
        type: Date,
        required: true,
        default: Date.now
    }
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact