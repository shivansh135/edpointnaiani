// routes/courses.js
const express = require('express');
const { userSignup, userOtp, userLogin, verify, adminLogin, adminSignup, getAdmins, deleteAdmin, updateAdmin } = require('../Controller/controller.login');
const LoginRouter = express.Router();

// Route to get all courses
LoginRouter.post('/userLogin', userLogin);
LoginRouter.post('/userOtp', userOtp);
LoginRouter.post('/userSignIn', userSignup);

LoginRouter.post('/adminLogin', adminLogin);
LoginRouter.post('/addAdmin', adminSignup);
LoginRouter.post('/editAdmin/:id', updateAdmin);
LoginRouter.post('/deleteAdmin/:id', deleteAdmin);

LoginRouter.get('/getAdmins',getAdmins)
 
LoginRouter.post('/verify', verify);
LoginRouter.post('/logout', (req, res) => {
    // Clear the cookies
    res.clearCookie('verificationToken'); // Replace 'cookieName' with the name of your cookie
    // Optionally, you can also send a response back to the client
    res.status(200).json({ message: 'Logout successful' });
});

module.exports = LoginRouter;
