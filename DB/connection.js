import mongoose from "mongoose";
import Pusher from 'pusher';
import dotenv  from 'dotenv';
dotenv.config({path: './config.env'});

// =========Pusher Cradantial for realtime behaviour===========
const pusher = new Pusher({
    appId: "1300887",
    key: "a73b7d1b6fcba563eede",
    secret: "b02d8538efa373a6a5b1",
    cluster: "ap2",
    useTLS: true
  });
  

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
    // Databse Connection Watch
    const changeStream = mongoose.connection.collection('chats').watch();
    // Change The Database Collection Pusher Useed
      changeStream.on('change', (change) => {
      pusher.trigger('messages-channel', 'newMessage', {
        'change': change
      });
    });
});