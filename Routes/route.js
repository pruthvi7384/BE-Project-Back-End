import express from 'express';
// =======DB Connection File Link==========
import '../DB/connection.js';
// ==========All Api Controllers===========
import { ChatPost, ChatGet, Home, Login, Signup } from '../Controllers/controller.js';
// =========Assign Express Router========
const Router = express.Router();

// ============Home Route==========
Router.get('/', Home);

// ============Signup Route========
Router.post('/signup', Signup);

// ============Signup Route========
Router.post('/login', Login);

// ============Chat Route==========
Router.post('/chat', ChatPost);

// ============Chat Route==========
Router.get('/chat', ChatGet);


export default Router;