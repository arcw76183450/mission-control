const http = require('http');
const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;

const httpServer = http.createServer(app);

async function startServer(){
    await loadPlanetsData();
    httpServer.listen(PORT,()=>{
        console.log(`Listening on port ${PORT}`);
    });
}

startServer();
