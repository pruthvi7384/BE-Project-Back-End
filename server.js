import express from 'express';
import cors from 'Cors';
import Router from './Routes/route.js';

const app = express();

//========== For The Json Formate Understand Backend Server===========
app.use(express.json());
app.use(cors());
// ========For Not Sequare Connection========
// app.use(cors());

// =======Runing Port Define Here========
const port = process.env.PORT;

// =======All Route Call Here========
app.use(Router);

// =======Server Listning Here========
app.listen(port,()=>{
    console.log(`listening on http:localhost:${port}`);
});