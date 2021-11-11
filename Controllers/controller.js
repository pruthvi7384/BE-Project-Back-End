import User from "../Modules/UserSchema.js";

// ===========Home Get===========
export const Home = (req, res)=>{
    res.status(200).send("Home Page Of Early Predication Of Life Style Diseases");
}

// ===========Signup Post========
export const Signup = async (req, res)=>{

    // ========Get All filed from user=======
    const { name, email, password, cpassword } = req.body;

    // ========Cheack filed is not empty=======
    if(!name || !email || !password || !cpassword){
        res.status(422).json({error: "Please Filed All Filleds Properly !"});
    }

    // =========Send Data=========
    try{
        const userExist = await User.findOne({ email: email });
        if(userExist) {
            res.status(422).json({error: "Email Id Alrady Exists !"});
        }else if(password != cpassword){
            res.status(422).json({error: "Password Is Not Matching !"});
        }else{
            const user = new User({name,email,password,cpassword});
            await user.save();
            res.status(201).json({message:"User Register Successfuly"});
        }
    }catch(err){
        console.log(err);
    }
}

// ===========Login Post=========
export const Login = (req, res)=>{
    res.status(200).send("Login Page");
}

// ===========Chat Post==========
export const ChatPost = (req, res)=>{
    res.status(200).send("Chat Page");
}

// ===========Chat Get===========
export const ChatGet = (req, res)=>{
    res.status(200).send("Chat Page");
}