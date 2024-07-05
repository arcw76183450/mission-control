const http = require('http');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model');

dotenv.config({path: path.resolve(__dirname,"..","..",".env")});
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;

const httpServer = http.createServer(app);

mongoose.connection.once('open', ()=> {
    console.log('MongoDB connection ready...');
})

mongoose.connection.on('error', (error)=> {
    console.error(error);
})

async function startServer(){
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    await loadPlanetsData();
    httpServer.listen(PORT,()=>{
        console.log(`Listening on port ${PORT}`);
    });
}

startServer();
