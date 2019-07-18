const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');

const server = createServer();

// use express middleware to handle cookies
server.express.use(cookieParser());

// decode the JWT so we can get the user ID on each request
server.express.use((req, res, next) => {
	const { token } = req.cookies;
	if (token) {
		const { userId } = jwt.verify(token, process.env.APP_SECRET);
		// put the userId onto the req for future requests to access
		req.userId = userId;
	}
	next();
});

server.start({
	cors: {
		credentials: true,
		origin: process.env.FRONTEND_URL
	}
}, deets => {
	console.log('Server is running on port: ' + deets.port);
});