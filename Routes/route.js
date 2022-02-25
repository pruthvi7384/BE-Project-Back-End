import express from 'express';

// =======DB Connection File Link==========
import '../DB/connection.js';

// ==========All Api Controllers===========
import { ChatPost, ChatGet, Home, Login, Signup, QuectionPost, getquection, answerquection, removeQuection, getSpecificUser, removeAccount, givesFeedback, getFeedback, removeFeedback, updateFeedback, doctorpost, doctorGet, doctorSpecific, getUser, doctorVerify, getDoctor, addDisease, removeDiseaseInfo, diseaseInfoEdit, allDiseaseInfo, diseaseSpecificDoctor, diseaseSpecific, getVerifyFeedback, verifyallDiseaseInfo, getProfileSpecific, getSpecificUserFeedback, getVerifyFeedbackDiseases, editAccount, doctorAccountEdit, postContact, getContactAll, adminContactBack, getSpecificContact, removeContact, getSpecificContactId, getSpecificQuection } from '../Controllers/controller.js';

// =========Assign Express Router========
const Router = express.Router();

// ============Home Route==========
Router.get('/', Home);

// =========Starting Account Router========

    // ============Signup Route========
    Router.post('/signup', Signup);

    // ============Login Route========
    Router.post('/login', Login);

    // ========Get All User=====
    Router.get('/allusers', getUser);

    // =======All Doctor=====
    Router.get('/alldoctor',getDoctor);

    // ========Delete Account Route=====
    Router.delete('/profile/:id', removeAccount);

    // ========Specific Account Route=====
    Router.get('/profile/:id', getProfileSpecific);

    // ======Edit Specific User Profile======
    Router.put('/profile/:id',editAccount);

// ======X===Ending Account Router===X=====

// ==========Starting Common Chat Router======

    // ============Chat Route==========
    Router.post('/chat', ChatPost);

    // ============Chat Route==========
    Router.get('/chat', ChatGet);

// ========X==Ending Common Chat Router==X====

// ========Starting Quection Router=======

    // ==========Quection Route========
    Router.post('/quection', QuectionPost);

    // ========All Quection Route=======
    Router.get('/quection', getquection);

    // ========All Specific Quection Route=======
    Router.get('/quection/:id', getSpecificQuection);

    // ===========Answer Quection=======
    Router.put('/quection/:id',answerquection);

    // =========Remove Quection=========
    Router.delete('/quection/:id',removeQuection);

    //=========Get Specific User Quection======
    Router.get('/quectionuser/:email',getSpecificUser);

// =====X===Ending Quection Router===X====

// =========Starting Feedback Router=======

    // ========Gives Feedback=========
    Router.post('/feedback',givesFeedback);

    // ========Update Feedback=========
    Router.put('/feedback/:id',updateFeedback);

    // ========Display Feedback========
    Router.get('/feedback', getFeedback);

    // ========Display Specific Feedback========
    Router.get('/feedback/:email', getSpecificUserFeedback);

    //=========Display Admin Verifyed Feedback===
    Router.get('/feedbackverify', getVerifyFeedback);

    //=========Display Admin Verifyed Feedback===
    Router.get('/feedbackverify/:id', getVerifyFeedbackDiseases);

    // ========Remove Feedback========
    Router.delete('/feedback/:id',removeFeedback);

// ========X==Ending Feedback Router==X=====

// ===========Starting Doctore Profile Router==========

    // ==========Doctor Profile Add Router======
    Router.post('/doctorprofile/:id', doctorpost);

    // =======Get Doctor Detailes=====
    Router.get('/doctors', doctorGet);

    // ======Get Specific Doctor Detailes=====
    Router.get('/doctor/:id',doctorSpecific);

    // ======Update Doctor Verification Status=====
    Router.put('/doctor/:id', doctorVerify);

    // ======Update Doctor Account Status========
    Router.put('/doctorprofile/:id', doctorAccountEdit);

// =======X===Ending Doctore Profile Router===X========

// ============Starting Disease Information Router===========

    // ========Add Disease Information==========
    Router.post('/disease', addDisease);

    // =======Remove Disease Information]=====
    Router.delete('/disease/:id',removeDiseaseInfo);

    // =========Specific Disease Info Edit========
    Router.put('/disease/:id', diseaseInfoEdit);

    // ========All Disease Info======
    Router.get('/alldisease', allDiseaseInfo);

    // ========All Verify Diseases Disease Info======
    Router.get('/alldiseaseverify', verifyallDiseaseInfo);

    // =======Spcific Doctor Added Disease Information===
    Router.get('/alldisease/:id', diseaseSpecificDoctor);

    // =======Spcific Disease Information===
    Router.get('/disease/:id', diseaseSpecific);

// ========X==Ending Disease Information Router==X=========

// ============Starting Contact From Router============

    // ========Send Contact========
    Router.post('/contact',postContact);

    // ========Send Contact========
    Router.get('/contact',getContactAll);

    // ========Update Contact========
    Router.put('/contact/:id',adminContactBack);

    // ========Get Specific Contact Detailes========
    Router.get('/contact/:email',getSpecificContact);

    // =======Remove Contact=====
    Router.delete('/contact/:id',removeContact);

    // ========Get Specific Contact Detailes using id========
    Router.get('/contactbyid/:id',getSpecificContactId);
// ==========X==Starting Contact From Router==X==========

export default Router;