import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    user_id:{
        type: String,
        required: true,
        default: 'NA'
    },
    user_name:{
        type: String,
        required: true
    },
    user_email:{
        type: String,
        required: true
    },
    question:{
        type: String,
        required: true
    },
    ask_date:{
        type: Date,
        required: true,
        default: Date.now
    },
    answer:{
        type: String,
        required: true,
    },
    answer_date:{
        type: Date,
        required: true,
    },
    doctor_id:{
        type:String,
        required: true,
    }
})

const Question = mongoose.model('Question',QuestionSchema);

export default Question;