const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {

    let error = {...err};

    error.message = err.message;

    // Mongoose bad Object
    if(err.name === 'CastError'){
        const message = `Resurce not found`;
        error = new ErrorResponse(message, 404);
    }

    if(err.code === 11000){
        const message = `Username: has already use. Please enter another name`;
        error = new ErrorResponse(message, 400);
    };

    

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
};

module.exports = errorHandler;