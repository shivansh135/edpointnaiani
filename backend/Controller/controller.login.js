const { User, Admin } = require('../Models/model.user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const sendEmailMiddleware = require('../middleware/email');

const JWT_SECRET = 'ed_point_naini_rj_sir_satyam';

// Function to generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Function to send OTP via emai
exports.userSignup = async (req, res) => {
  try {
    const { email,name,phone,standard,city } = req.body;
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }
    // Generate OTP
    user = new User({
      email,
      name,
      phone,
      standard,
      city,
    });
    await user.save();
    sendEmailMiddleware([email,'Education Point Account Created','Welcom to Education Point Naini, '+name]);

    return res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.userOtp = async (req, res) => {
    try {
      const { email } = req.body;
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
      // Generate JWT token
      const otp = generateOTP();
      user.otp = otp;
      await user.save();
      res.status(200).json({ message: 'OTP sent successfully' });

      sendEmailMiddleware([email,'Education Point Login OTP','Your OTP for one time login in Education Point Naini is : '+otp]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  

  exports.userLogin = async (req, res) => {
    try {
      const { email, otp } = req.body;
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
      // Check if OTP matches
      if (user.otp != otp) {
        return res.status(401).json({ error: 'Invalid OTP' });
      }
      // Generate verification token
      const verificationToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '5d' });
      // Set verification token in cookie
      res.cookie('verificationToken', verificationToken, {maxAge: 5 * 24 * 60 * 60 * 1000 }); // Expires in 5 days
      return res.status(200).json({ message: 'Login successful', verificationToken });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
}


exports.adminLogin = async (req, res) => {
  try {
      const { email, password } = req.body;
      // Find admin by email
      const admin = await Admin.findOne({ email });
      if (!admin) {
          return res.status(400).json({ error: 'Admin not found' });
      }

      // Extract phone number and date of birth from the admin data
      const { phone, dob } = admin;
      
      // Convert dob to the desired string format
      const dobString = dob.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });

      // Extract day, month, and year from the date of birth
      const dobParts = dobString.split('/');
      const day = dobParts[1];
      const month = dobParts[0];
      const year = dobParts[2];

      // Generate password
      const generatedPassword = phone.substring(0, 5) + year + month + day;
      // Check if password matches
      if (password !== generatedPassword) {
          return res.status(401).json({ error: 'Invalid password' });
      }

      // Generate JWT token
      const token = jwt.sign({ adminId: admin._id }, JWT_SECRET);

      // Set token in cookie
      res.cookie('verificationToken', token, { maxAge: 1 * 24 * 60 * 60 * 1000 });

      return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
  }
};



exports.verify = async (req, res) => {
    try {
      // Get verification token from cookie
      const verificationToken = req.cookies.verificationToken;
      if (!verificationToken) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      // Verify verification token
      const decoded = jwt.verify(verificationToken, JWT_SECRET);
      // Check if it's a user or admin token
      if (decoded.userId) {
        // Check if user exists
        const user = await User.findById(decoded.userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        // Add user role and data to response
        return res.status(200).json({ role: 'user', user: user });
      } else if (decoded.adminId) {
        // Check if admin exists
        const admin = await Admin.findById(decoded.adminId);
        if (!admin) {
          return res.status(404).json({ error: 'Admin not found' });
        }
        // Add admin role and data to response
        return res.status(200).json({ role: 'admin', user: admin });
      } else {
        return res.status(401).json({ error: 'Invalid token' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  async function verifyAdmin(req){
    try {
      const verificationToken = req.cookies.verificationToken;

      if (!verificationToken) {
        return 0;
      }
      // Verify verification token
      const decoded = jwt.verify(verificationToken, JWT_SECRET);
      if (decoded.adminId) {
        // Check if admin exists
        const admin = await Admin.findById(decoded.adminId);
        if (!admin) {
          return 0;
        }
        return 1;

      }
      
    } catch (error) {
      return 0
    }
  }

  exports.getAdmins = async (req, res) => {
    try {
      // Check if admin already exists
      const r = await verifyAdmin(req, res);
      if (r !== 1) {
        return res.status(401).json({message:'Unauthorized'});
      }
      let admin = await Admin.find();
      return res.status(200).json({data:admin});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  exports.adminSignup = async (req, res) => {
    try {
      const { email, name, phone,dob } = req.body;
      // Check if admin already exists
      const r = await verifyAdmin(req, res);
      if (r !== 1) {
        return res.status(401).json({message:'Unauthorized'});
      }
      let admin = await Admin.findOne({ email });
      if (admin) {
        return res.status(400).json({ error: 'Admin already exists' });
      }
      admin = new Admin({
        email,
        name,
        phone,
        dob
      });
      await admin.save();
      return res.status(200).json({ message: 'Admin created successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  exports.updateAdmin = async (req, res) => {
    try {
      const r = await verifyAdmin(req, res);
      if (r !== 1) {
        return res.status(401).json({message:'Unauthorized'});
      }
        const { id } = req.params;
        const { email, name, phone, dob } = req.body;

        // Check if admin exists
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        // Update admin fields
        admin.email = email;
        admin.name = name;
        admin.phone = phone;
        admin.dob = dob;

        // Save updated admin
        await admin.save();

        return res.status(200).json({ message: 'Admin updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const r = await verifyAdmin(req, res);
    if (r !== 1) {
      return res.status(401).json({message:'Unauthorized'});
    }
      const { id } = req.params;

      // Check if admin exists
      const admin = await Admin.findById(id);
      if (!admin) {
          return res.status(404).json({ error: 'Admin not found' });
      }

      // Delete admin
      await admin.remove();

      return res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
  }
};


