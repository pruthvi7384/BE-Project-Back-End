import express from 'express';

// =======DB Connection File Link==========
import '../DB/connection.js';

// ==========All Api Controllers===========
import { ChatPost, ChatGet, Home, Login, Signup, QuectionPost, getquection, answerquection, removeQuection, getSpecificUser, removeAccount, givesFeedback, getFeedback, removeFeedback, updateFeedback, doctorpost, doctorGet, doctorSpecific, getUser } from '../Controllers/controller.js';

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

    // ========Delete Account Route=====
    Router.delete('/profile/:id', removeAccount);

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

    // ========Remove Feedback========
    Router.delete('/feedback/:id',removeFeedback);

// ========X==Ending Feedback Router==X=====

// ===========Starting Doctore Profile Router==========

    // ==========Doctor Profile Add Router======
    Router.post('/doctorprofile/:id', doctorpost);

    // =======Get Doctor Detailes=====
    Router.get('/doctors',doctorGet);

    // ======Get Specific Doctor Detailes=====
    Router.get('/doctor/:id',doctorSpecific);

    // ======Update Doctor Verification Status========
    Router.put('/doctor/:id', );


// =======X===Ending Doctore Profile Router===X========

export default Router;