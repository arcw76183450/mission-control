const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model');
const { mongoConnect } = require('./services/mongo');

const PORT = process.env.PORT || 8000;
const httpServer = http.createServer(app);

async function startServer(){
    await mongoConnect();
    await loadPlanetsData();
    httpServer.listen(PORT,()=>{
        console.log(`Listening on port ${PORT}`);
    });
}

startServer();
