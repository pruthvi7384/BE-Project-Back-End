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
    address:{
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