// ==========User Schema Here=========
import User from "../Modules/UserSchema.js";

// ==========Chat Schema Here=========
import Chat from "../Modules/ChatSchema.js";

// ==========bcrypt for password matching========
import bcrypt from 'bcryptjs';

// ============import pusher==========
import Pusher from 'pusher';

// ===========Home Get===========
export const Home = (req, res)=>{
    res.status(200).send("Home Page Of Early Predication Of Life Style Diseases");
}

// ===========Signup Post========
export const Signup = async (req, res)=>{

    // ========Get All filed from user=======
    const { name, email, password, cpassword, crteatedAt } = req.body;

    // ========Cheack filed is not empty=======
    if(!name || !email || !password || !cpassword || !crteatedAt){
        res.status(422).json({error: "Please Filed All Filleds Properly !"});
    }

    // =========Send Data=========
    try{
        const userExist = await User.findOne({ email: email });
        if(userExist) {
            res.status(422).json({message: "Email Id Alrady Exists !"});
        }else if(password != cpassword){
            res.status(422).json({message: "Password Is Not Matching !"});
        }else{
            const user = new User({name,email,password,cpassword,crteatedAt});
            await user.save();
            res.status(201).json({message:"User Register Successfuly"});
        }
    }catch(err){
        console.log(err);
    }
}

// ===========Login Post=========
export const Login = async (req, res)=>{
    try{    
       // ========email and password from user=======
        const { email, password } = req.body;

        // ========Cheack filed is not empty=======
        if(!email || !password){
            res.status(422).json({message: "Please Enter Both Fieleds Properly !"});
        }

        // ==========Match Email id exist or not===========
        const login = await User.findOne({email: email});

        // ===========Email Id Exist Then Cheack Password=========
        if(login){
            // ==========Compare Bycript Password Here========
            const isMatch = await bcrypt.compare(password, login.password);
            // =============Cheack Password Here=============
            if(isMatch){
                res.status(200).json({message: "Login Successfuly"});
            }else{
                res.status(422).json({message: "Your Login Cradntial is wrong Please Check and try again later!"});
            }
        }else{
            res.status(422).json({message: "User Not Register Please First Register!"});
        }
    }catch(e){
        console.log(e.message);
    }
}

// ===========Chat Post==========
export const ChatPost = async(req, res)=>{
    // ========get Cmessage from user=======
    const { name, message, timestamp} = req.body;
    try{
        const chat = new Chat({ name, message, timestamp});
        await chat.save();
        res.status(201).json({message:"Message Succesfuly Send"});
    }catch(e){
        console.log(e.message);
    }
}

// ===========Chat Get===========
export const ChatGet = async (req, res)=>{
    try{
        const messages = await Chat.find()
        messages.sort((b,a)=>{
            return a.timestamp - b.timestamp;
        });
        res.status(200).send(messages);
    }catch(e){
        console.log(e.message);
    }
}