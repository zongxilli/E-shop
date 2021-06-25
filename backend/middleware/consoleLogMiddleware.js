// ---------------------------------------------------------------------
//todo                      console log middleware
// ---------------------------------------------------------------------
//
//? Kind of middleware which will console log every time we make a request
//
//

const requestAddress = (req, res, next) => {
	console.log(`We have made one request to ${req.originalUrl}`.rainbow);
	next();
};

export { requestAddress };
