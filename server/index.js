const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routers/router');
const cookieParser = require('cookie-parser');
const { default: mongoose } = require('mongoose');

const SERVER_PORT = 4000;
const corsConfig = {
	origin: 'http://localhost:5173',
	credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());

app.use(router);

mongoose.connection.on('open', () => console.log('connected to DB and connection is open'));
app.listen(SERVER_PORT, (error) => {
	if (error) {
		console.log(error);
	} else {
		console.log(`Server is listening on port ${SERVER_PORT}!`); // eslint-disable-line no-console
	}
});
