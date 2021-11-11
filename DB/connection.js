import mongoose from "mongoose";
import dotenv  from 'dotenv';
dotenv.config({path: './config.env'});

//============== DB_CONECTION==============

const connection_URL = process.env.DATABASE;
mongoose.connect(connection_URL, {
    useNewUrlParser: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// Database Connected Or Not
mongoose.connection.once('open',()=>{
    console.log('DB CONNECTED');
});