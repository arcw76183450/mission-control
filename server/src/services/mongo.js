const dotenv = require('dotenv');
const path = require('path');
const mongoose =  require('mongoose');

dotenv.config({path: path.resolve(__dirname,"..","..","..",".env")});
const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open', ()=> {
    console.log('MongoDB connection ready...');
})

mongoose.connection.on('error', (error)=> {
    console.error(error);
})

async function mongoConnect(){
    return await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

async function mongoDisconnect(){
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}