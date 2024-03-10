 const constants =require("../constants.js")

const errorHandler =(err,req,res,next) =>{
    const statusCode = res.statusCode ? res.statusCode:500; 
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({
                title : "validation failed",message: err.message, stackTrace: err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.json({title : "not found",message: err.message, stackTrace: err.stack});
            break; 
        case constants.FORBIDDEN:
            res.json({title : "forbidden",message: err.message, stackTrace: err.stack});
            break; 
        case constants.UNAUTHORZIED:
            res.json({title : "UNAUTHORZIED",message: err.message, stackTrace: err.stack});
            break; 
        default:
            console.log("nor error")
    }
    res.json({title : "not found",message: err.message, stackTrace: err.stack});
};

module.exports = errorHandler; 