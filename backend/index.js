const express = require('express');
const router = require('./Routes/routes.course');
const LoginRouter = require('./Routes/routes.login');
const connectDB = require('./db');
const cors = require('cors');
const sendEmailMiddleware = require('./middleware/email');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors(
  {origin: 'http://localhost:3000', credentials: true,}
));
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

connectDB();
// Routes
app.use('/cources', router);
app.use('/login', LoginRouter);

// Start the server
app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`);
});
