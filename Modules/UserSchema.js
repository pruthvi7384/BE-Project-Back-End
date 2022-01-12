import mongoose from 'mongoose';
// ========import for password bcrypt==========
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    cpassword:{
        type: String,
        required: true,
    },
    crteatedAt:{ 
        type: Date, 
        default: Date.now
    },
    address:{
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
            type:String,
            required: true,
            default: 'NA'
        }
    },
    role:{
        type: String,
        required: true,
    }
});

// we are hasking password here

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
})

const User = mongoose.model('Users',userSchema);

export default User;