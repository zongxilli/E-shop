// ---------------------------------------------------------------------
//todo                        Error middleware
// ---------------------------------------------------------------------
//
//? When we made a wrong request(HTTP 的 route 错了)
//? the error that we got will turned into json format response 
//? design by ourselves
//
// for example: http://api/weqoqjdoqiwjd/
//                              ^
//                     根本没有这个 route 
//
const notFound = (req, res, next) => {
	// This is how we can throw an error
	const error = new Error(`We didn't find - ${req.originalUrl}`);
	res.status(404);
	next(error);
};


// ---------------------------------------------------------------------
//todo                        Error Handler
// ---------------------------------------------------------------------
//? Make the format of error message we want (json format at this time)
//
//
const errorHandler = (err, req, res, next) => {
	// We may get 200 error response
	// If it is 200, then we make it to 500(server error)
	// Else do not do anything
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

	// Set response's status to whatever the statusCode is
	res.status(statusCode);

	// We want the response to be json
	// And the object to be a message
	res.json({
		// Message comes from err
		message: err.message,

		// We also want the stack trace
		stack: process.env.NODE_ENV === 'production' ? null : err.stack,
	});
};

export { notFound, errorHandler };
