import mongoose from "mongoose";
import Pusher from 'pusher';


// =========Pusher Cradantial for realtime behaviour===========
const pusher = new Pusher({
    appId: "1300887",
    key: "a73b7d1b6fcba563eede",
    secret: "b02d8538efa373a6a5b1",
    cluster: "ap2",
    useTLS: true
  });
  

//============== DB_CONECTION==============

const connection_URL = `mongodb+srv://admin:gqnfcAFEWrZbCjZI@cluster0.xtcpc.mongodb.net/Diseases?retryWrites=true&w=majority`;
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