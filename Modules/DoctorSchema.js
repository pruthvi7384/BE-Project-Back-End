import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
    register_id:{
        type: String,
        required: true
    },
    contact_no:{
        type: Number,
        required: true
    },
    about:{
        type: String
    },
    Education_Detailes:{
        degree:{
            type: String,
            required: true
        },
        profection:{
            type:String,
            required:true
        },
        degree_certificate:{
            type:String,
            required: true
        }
    },
    verification_status:{
        replay:{
            type: String,
            required : true
        },
        status:{
            type: Boolean,
            required: true,
            default:false
        },
        verify_date:{
            type: String,
            required: false,
        }
    }

})

const Doctor = mongoose.model('Doctor',DoctorSchema);

export default Doctor;