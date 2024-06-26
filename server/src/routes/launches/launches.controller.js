const { getLaunches } = require('../../models/launches.model');

function httpGetAllLaunches(req, res){
    return res.status(200).json(getLaunches());
}

module.exports = {
    httpGetAllLaunches,
}