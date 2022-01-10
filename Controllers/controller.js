// ==========User Schema Here=========
import User from "../Modules/UserSchema.js";

// ==========Chat Schema Here=========
import Chat from "../Modules/ChatSchema.js";

// ===========Quection Schema Here======
import Question from "../Modules/QuestionSchema.js";

// ============Feedback Schema Here======
import Feedback from "../Modules/FeedbackSchema.js";

// ==========Doctor Schema Here======
import Doctor from "../Modules/DoctorSchema.js";

//==========Disease Schema Here=====
import Disease from "../Modules/DiseaseSchema.js";

// ==========bcrypt for password matching========
import bcrypt from 'bcryptjs';

// ============import pusher==========
import Pusher from 'pusher';

// ===========Home Get===========
export const Home = (req, res)=>{
    res.status(200).send("Home Page Of Early Predication Of Life Style Diseases");
}
// =======Starting Account API============

    // ===========Signup Post========
    export const Signup = async (req, res)=>{

        // ========Get All filed from user=======
        const { name, email, password, cpassword, crteatedAt, role } = req.body;

        // ========Cheack filed is not empty=======
        if(!name || !email || !password || !cpassword || !role){
            res.status(201).json({message: "Please Filed All Filleds Properly !"});
        }

        // =========Send Data=========
        try{
            const userExist = await User.findOne({ email: email });
            if(userExist) {
                res.status(201).json({message: "Email Id Alrady Exists !"});
            }else if(password != cpassword){
                res.status(201).json({message: "Password Is Not Matching !"});
            }else{
                const user = new User({name,email,password,cpassword,crteatedAt,role});
                await user.save();
                res.status(201).json({message:"You Are Register Successfuly, Thank You For Choosing E Health Care Please Login Now !"});
            }
        }catch(err){
            console.log(err);
        }
    }

    // ===========Login Post=========
    export const Login = async (req, res)=>{
        try{    
        // ========email and password from user=======
            const { email, password, } = req.body;

            // ========Cheack filed is not empty=======
            if(!email || !password){
                res.status(201).json({message: "Please Enter Both Fieleds Properly !"});
            }

            // ==========Match Email id exist or not===========
            const login = await User.findOne({email: email});

            // ===========Email Id Exist Then Cheack Password=========
            if(login){
                // ==========Compare Bycript Password Here========
                const isMatch = await bcrypt.compare(password, login.password);
                // =============Cheack Password Here=============
                if(isMatch){
                    res.status(200).json({message: "Your Login Successfuly, Thank You For Choosing E Health Care !",login:login});
                }else{
                    res.status(201).json({message: "Your Login Cradntial is wrong Please Check and try again later!"});
                }
            }else{
                res.status(201).json({message: "Your Not Register Please First Register !"});
            }
        }catch(e){
            console.log(e.message);
        }
    }

    // ========Get All User Detailes=========
    export const getUser = async (req, res)=>{
        try{
            const user = await User.find({role : 'user'});
            user.sort((b,a)=>{
                return a.crteatedAt - b.crteatedAt;
            });
            res.status(200).send(user);
        }catch(e){
            console.log(e.message);
        }
    }

    // ========Get All User Detailes=========
    export const getDoctor = async (req, res)=>{
        try{
            const doctor = await User.find({role : 'doctor'});
            doctor.sort((b,a)=>{
                return a.crteatedAt - b.crteatedAt;
            });
            res.status(200).send(doctor);
        }catch(e){
            console.log(e.message);
        }
    }

    // ========Get All User Detailes=========
    export const getProfileSpecific = async (req, res)=>{
        try{
            const doctor = await User.find({_id: req.params.id});
            res.status(200).send(doctor);
        }catch(e){
            console.log(e.message);
        }
    }

    // ========Delete Specific Account========
    export const removeAccount = async (req, res)=>{
        try{
            await User.findOneAndDelete({_id: req.params.id});
            const doctor = await Doctor.find({register_id: req.params.id});
            if(doctor){
                await Doctor.findOneAndDelete({register_id: req.params.id});
                res.status(201).json({message:"Doctor Account Removed Sussesully."});
            }else{
                res.status(201).json({message:"User Account Removed Sussesully."});
            }
        }catch(e){
            console.log(e.message);
        }
    }
// ==========X==Ending Account API==X===========

// =========Starting Comman Chat API Creation============

    // ===========Chat Post==========
    export const ChatPost = async(req, res)=>{
        // ========get message from user=======
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

// =======X==Ending Comman Chat API Creation==X==========

// ==========Starting Quection API==============

    // ==========Send Quection========
    export const QuectionPost = async(req, res)=>{

        //=========== Get Quection Deatiles From User==========
        const {user_id, disease_id, user_name, user_email, question, ask_date, answer, doctor_id} = req.body;

        // ========Cheack filed is not empty=======
        if(!user_name || !user_email || !question){
            res.status(422).json({message: "Please Filed All Filleds Properly !"});
        }

        // =========Send Data=========
        try{
            const quection = new Question({user_id, disease_id, user_name, user_email, question, ask_date, answer, doctor_id});
            await quection.save();
            res.status(201).json({message:"Thank You For Asking Quection Our Team Try To Answering Your Quection As Soon As Posible. Please Cheack Your Quection Detailes In Your Profile."});
        }catch(e){
            console.log(e.message);
        }
    }

    //===========Get All Quection=========
    export const getquection = async (req,res)=>{
        try{
            const quections = await Question.find();
            res.status(200).send(quections);
        }catch(e){
            console.log(e.message);
        }
    }

    // ===========Answering Specific Quection==========
    export const answerquection = async (req,res)=>{
        
        //=========== Get Quection Deatiles From User==========
        const {user_name, user_email, question, answer, doctor_id, answer_date} = req.body;

        // ========Cheack filed is not empty=======
        if(!user_name || !user_email || !question || !answer){
            res.status(422).json({message: "Please Filed All Filleds Properly !"});
        }

        try{
            await Question.findOneAndUpdate(
                {
                    _id: req.params.id
                },
                {
                    $set: {answer, doctor_id, answer_date}
                }
            );
            res.status(201).json({message:"You Are Answering Quection Sussesully."});
        }catch(e){
            console.log(e.message);
        }
    }

    // ========Delete Specific Quection========
    export const removeQuection = async (req, res)=>{
        try{
            await Question.findOneAndDelete({_id: req.params.id});
            res.status(201).json({message:"Quection Remove Sussesully."});
        }catch(e){
            console.log(e.message);
        }
    }

    // ===========Get Specific User Quection=======
    export const getSpecificUser = async (req, res)=>{
        console.log(req.params.email);
        try{
            const quection = await Question.find({user_email: req.params.email});
            quection.sort((b,a)=>{
                return a.ask_date - b.ask_date;
            });
            res.status(200).send(quection);
        }catch(e){
            console.log(e.message);
        }
    }

// ========X==Ending Quection API==X============

// ========Starting Feedback Sending API========

    // ==========Gives Feedback========
    export const givesFeedback = async (req,res)=>{
        // ======Get Feedback Information======
        const { user_id, disease_id, name, email, feedback, feedback_date, status } = req.body;

        // =======Check Filed Empty Or Not======
        if(!name || !email || !feedback){
            res.status(422).json({message: "Please Filed All Filleds Properly !"});
        }

        try{
            const feedbackuser = new Feedback( { user_id, disease_id, name, email, feedback, feedback_date, status });
            await feedbackuser.save();
            res.status(201).json({message: "Thank You For Providing Your Valuabile Feedback."})
        }catch(e){
            console.log(e.message);
        }
    }

    // ========Display Feedback========
    export const getFeedback = async (req,res)=>{
        try{
            const feedback = await Feedback.find()
            feedback.sort((b,a)=>{
                return a.feedback_date - b.feedback_date;
            });
            res.status(200).send(feedback);
        }catch(e){
            console.log(e.message);
        }
    }

    //========Update Feedbaack=======
    export const updateFeedback = async (req,res)=>{
        //=======Get Detailes From Feedback=======
        const { status } = req.body;
        try{
            await Feedback.findOneAndUpdate(
                {
                    _id: req.params.id
                },
                {
                    $set: {status}
                }
            );
            res.status(201).json({message:"Feedback Status Change Sussesully."});
        }catch(e){
            console.log(e.message);
        }
    }

    // ========Display Admin Verify Feedback========
    export const getVerifyFeedback = async (req,res)=>{
        try{
            const feedback = await Feedback.find({visibility: true})
            feedback.sort((b,a)=>{
                return a.feedback_date - b.feedback_date;
            });
            res.status(200).send(feedback);
        }catch(e){
            console.log(e.message);
        }
    }

    // ========Display Admin Verify Disease Feedback========
    export const getVerifyFeedbackDiseases = async (req,res)=>{
        try{
            const feedback = await Feedback.find({
                disease_id: req.params.id,
                status: true
            })
            feedback.sort((b,a)=>{
                return a.feedback_date - b.feedback_date;
            });
            res.status(200).send(feedback);
        }catch(e){
            console.log(e.message);
        }
    }

    // ========Remove Feedback=======
    export const removeFeedback = async (req,res)=>{
        try{
            await Feedback.findOneAndDelete({_id: req.params.id});
            res.status(201).json({message:"Feedback Removed Sussesully."});
        }catch(e){
            console.log(e.message);
        }
    }

     // ===========Get Specific User Feedbacks=======
     export const getSpecificUserFeedback = async (req, res)=>{
        console.log(req.params.email);
        try{
            const feedback = await Feedback.find({email: req.params.email});
            feedback.sort((b,a)=>{
                return a.feedback_date - b.feedback_date;
            });
            res.status(200).send(feedback);
        }catch(e){
            console.log(e.message);
        }
    }

// ======X==Ending Feedback Sending API==X=====

// ========Staring Doctor Profile API=========

    // ========Doctor Profile Post APT======
    export const doctorpost = async (req,res)=>{

        // =========Get Detailes From Doctor=========
        const contact_no = req.body.contact_no;
        const about = req.body.about;
        const city = req.body.address.city;
        const area = req.body.address.area;
        const pin_code = req.body.address.pin_code;
        const degree = req.body.Education_Detailes.degree;
        const profection = req.body.Education_Detailes.profection;
        const degree_certificate = req.body.Education_Detailes.degree_certificate;
        const status = false;
        const verify_date = 'na';
        const replay = 'na'

        // ============All Feiled Fill Or Not==========
        if(!contact_no || !city || !area || !pin_code || !degree || !profection || !degree_certificate){
            res.status(422).json({message: "Please Filed All Filleds Properly !"});
        }
      
        try{
            const doctor = new Doctor({
                register_id:req.params.id,
                contact_no: contact_no,
                about : about,
                address:{
                    city: city,
                    area: area,
                    pin_code: pin_code,
                },
                Education_Detailes:{
                    degree: degree,
                    profection: profection,
                    degree_certificate: degree_certificate
                },
                verification_status:{
                    status: status,
                    verify_date: verify_date,
                    replay: replay
                }
            });
            await doctor.save();
            res.status(201).json({message: "Thank You For Providing Your Detailes Our Team Verify Your Detailes Within 24 Hours."});
        }catch(e){
            console.log(e.message);
        }
    }

    // ========Get Doctor Detailes=====
    export const doctorGet = async (req, res)=>{
        try{
            const doctor = await Doctor.find();
            res.status(200).send(doctor);
        }catch(e){
            console.log(e.message);
        }
    }

    // ==========Get Specific Doctor Detailes====
    export const doctorSpecific = async (req, res)=>{
        try{
            const doctor = await Doctor.find({register_id:req.params.id});
            res.status(200).send(doctor);
        }catch(e){
            console.log(e.message);
        }
    }

    // =========Update Status=========
    export const doctorVerify = async (req, res)=>{
        // ========Get Verifictaion Detailes=====
        const status = req.body.verification_status.status;
        const verify_date = new Date();
        const replay = req.body.verification_status.replay
        try{
            await Doctor.findOneAndUpdate(
                {
                    register_id:req.params.id
                },
                {
                    $set: {
                        verification_status:{
                            status: status,
                            verify_date: verify_date,
                            replay : replay
                        }
                    }
                }
            );
            res.status(201).json({message:"Doctor Account Verification Sussesully."});
        }catch(e){
            console.log(e.message);
        }
    }
// =====X===Ending Doctor Profile API===X======

// ==========Starting Disease Information Router========

    // ========Add Disease Information===========
    export const addDisease = async (req, res)=>{
        // ========Get Disease Detailes From Doctor====
        const doctor_id = req.body.doctor_id;
        const desease_name = req.body.desease_name;
        const description = req.body.detail.description;

        // ===========Cheak Detailes Not Empty=======
        if(!desease_name || !description || !doctor_id){
            res.status(422).json({message: "Please Filed All Filleds Properly !"});
        }

        // ==========Save Deisease Detailes==========
        try{
           const diseas = new Disease(req.body); 
           await diseas.save();
           res.status(201).json({message: "Thank You For Providing Disease Detailes Our Team Verify Your Add Disease Detailes Within 24 Hours."});
        }catch(e){
            console.log(e.message);
        }
    }

    // =======Delete Specific Disease Information======
    export const removeDiseaseInfo = async (req, res)=>{
        try{
            await Disease.findOneAndDelete({_id: req.params.id});
            res.status(201).json({message:"Disease Information Remove Sussesully."});
        }catch(e){
            console.log(e.message);
        }
    }

    // =========Disease Info Edit=========
    export const diseaseInfoEdit = async (req,res)=>{
        try{
            await Disease.findOneAndUpdate(
                {_id: req.params.id},
                {$set: req.body}
            );
            res.status(201).json({message: "Disease Information Edited Sussesfuly."})
        }catch(e){
            console.log(e.message);
        }
    }

    // ===========Get All Disease Info=========
    export const allDiseaseInfo = async (req,res)=>{
        try{
            const disease = await Disease.find();
            disease.sort((b,a)=>{
                return a.created_date - b.created_date;
            });
            res.status(200).send(disease);
        }catch(e){
            console.log(e.message);
        }
    }

    // ===========Get Verifyed Information Disease===========
    export const verifyallDiseaseInfo = async (req,res)=>{
        try{
            const disease = await Disease.find({
                visibility: true
            });
            disease.sort((b,a)=>{
                return a.verify_date - b.verify_date;
            });
            res.status(200).send(disease);
        }catch(e){
            console.log(e.message);
        }
    }

    // ========Specific Disease Information=====
    export const diseaseSpecificDoctor = async (req, res)=>{
        try{
            const disease = await Disease.find({doctor_id:req.params.id});
            disease.sort((b,a)=>{
                return a.created_date - b.created_date;
            });
            res.status(200).send(disease);
        }catch(e){
            console.log(e.message);
        }
    }

    // ============Get Specific Disease Information=========
    export const diseaseSpecific = async (req, res)=>{
        try{
            const disease = await Disease.find({_id:req.params.id});
            res.status(200).send(disease);
        }catch(e){
            console.log(e.message);
        }
    }


// ========X===Ending Disease Information Router===X====