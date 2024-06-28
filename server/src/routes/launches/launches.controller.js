const { 
    getLaunches, 
    addNewLaunch,
    checkLaunchwithId,
    abortLaunchById
} = require('../../models/launches.model');

function httpGetAllLaunches(req, res){
    return res.status(200).json(getLaunches());
}

function httpAddNewLaunch(req,res){
    const launch = req.body;
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target){
        return res.status(400).json({
            error: "Missing required launch properties",
        })
    }
    launch.launchDate = new Date(launch.launchDate);
    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error: "Enter a valid date",
        })
    }
    addNewLaunch(launch);
    return res.status(201).json(launch);
}

function httpAbortLaunch(req, res){
    const launchId = Number(req.params.id);
    
    //if launch details doesn't exist
    if (!checkLaunchwithId(launchId)){
        return res.status(404).json({
            error: "No launch found",
        })
    }

    const abortedLaunch = abortLaunchById(launchId);
    return res.status(200).json(abortedLaunch)
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}