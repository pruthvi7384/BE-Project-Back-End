import express from 'express';

// =======DB Connection File Link==========
import '../DB/connection.js';

// ==========All Api Controllers===========
import { ChatPost, ChatGet, Home, Login, Signup, QuectionPost, getquection, answerquection, removeQuection, getSpecificUser, removeAccount, givesFeedback, getFeedback, removeFeedback } from '../Controllers/controller.js';

// =========Assign Express Router========
const Router = express.Router();

// ============Home Route==========
Router.get('/', Home);

// =========Starting Account Router========

    // ============Signup Route========
    Router.post('/signup', Signup);

    // ============Login Route========
    Router.post('/login', Login);

    // ========Delete User Account Route=====
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

    // ========Display Feedback========
    Router.get('/feedback', getFeedback);

    // ========Remove Feedback========
    Router.delete('/feedback/:id',removeFeedback);

// ========X==Ending Feedback Router==X=====

// ===========Starting Doctore Profile Router==========



// =======X===Ending Doctore Profile Router===X========

export default Router;