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
            required: true,
            default: 'https://www.hopkinsmedicine.org/-/media/images/health/1_-conditions/chidrens-health/blounts-disease-teaser.ashx'
        },
        description:{
            type: String,
            required: true
        },
        symptoms:{
            type: [],
        },
        precaution:{
            type: [],
        },
        medicine:{
            type: [],
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
            type: String,
            required: true,
            default: 'NA'
        }
    },
    most_predicated_area:{
        city:{
            type: String,
            required: true,
            default: 'NA'
        },
        area:{
            type: String,
            required: true,
            default: 'NA'
        },
        pin_code:{
            type:Number,
            required: true,
            default: 0
        }
    },
    visibility:{
        type: Boolean,
        required: true,
        default: false
    }
})

const Disease = mongoose.model('Disease',DiseaseSchema);

export default Disease;