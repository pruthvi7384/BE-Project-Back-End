import mongoose from 'mongoose';

const DiseaseSchema = new mongoose.Schema({
    doctor_id:{
        type: String,
        required: true
    },
    desease_name:{
        type: String,
        required: true
    },
    detail:{
        image:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        symptoms:{
            type: [Array],
            required: true
        },
        precaution:{
            type: [Array],
            required: true
        },
        medicine:{
            type: [Array],
            required: true
        }
    },
    created_date:{
        type: Date,
        required: true,
        default: Date.now
    },
    verification_status:{
        status:{
            type: Boolean,
            required: true,
            default:false
        },
        verify_date:{
            type: Date,
            required: true
        }
    },
    most_predicated_area:{
        city:{
            type: String,
            required: true
        },
        area:{
            type: String,
            required: true
        },
        pin_code:{
            type:Number,
            required: true
        }
    }
})

const Disease = mongoose.model('Disease',DiseaseSchema);

export default Disease;