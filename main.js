const fs=require("fs")
const cors = require('cors');
const express = require("express");
const mongoose = require("mongoose");
var studentModel = require("./model/student");
var enrollModel=require("./model/enroll");
var leaveModel=require("./model/leave");
const app = express();
const PORT = 4000;
const url='http://localhost:4000/updateprofile';
app.use(express.json());
// Enable CORS for all requests
app.use(cors());

//Mongodb Connection 
const MONGO_URL = 'mongodb://127.0.0.1:27017/student'

mongoose.connect(MONGO_URL)
console.log("Mongodb is connected")
app.post("/signup", (req, res) => {
  studentModel.create(req.body)
    .then(() => {
      // Send a success response
      res.status(201).json({ message: "Admin signed up successfully" });
    })
    .catch(err => {
      // Handle any errors that occur during signup
      console.error("Error signing up student:", err);
      // Send an error response
      res.status(500).json({ error: "Error signing up admin" });
    });
});

app.post("/enroll", (req, res) => {
  enrollModel.create(req.body)
    .then(() => {
      // Send a success response
      res.status(201).json({ message: "Student enrolled successfully" });
    })
    .catch(err => {
      // Handle any errors that occur during signup
      console.error("Error signing up student:", err);
      // Send an error response
      res.status(500).json({ error: "Error enrolling student" });
    });
});
app.put('/block/:rgnum', (req, res) => {
  const rgnum = req.params.rgnum;
  const { status } = req.body;

  enrollModel.findOneAndUpdate({ rgnum: rgnum }, { status }, { new: true })
      .then(updatedAccount => {
          if (updatedAccount) {
              res.json({ success: true, message: 'Account status updated successfully' });
          } else {
              res.status(404).json({ success: false, message: 'Account not found' });
          }
      })
      .catch(err => {
          console.error('Error updating account status:', err);
          res.status(500).json({ success: false, message: 'Error updating account status' });
      });
});

// app.post("/leaveform/:rgnum", (req, res) => {
//   enrollModel.create(req.body)
//     .then(() => {
//       // Send a success response
//       res.status(201).json({ message: "Student enrolled successfully" });
//     })
//     .catch(err => {
//       // Handle any errors that occur during signup
//       console.error("Error signing up student:", err);
//       // Send an error response
//       res.status(500).json({ error: "Error enrolling student" });
//     });
// });
app.post("/leaveform/:rgnum", async (req, res) => {
  try {
    const rgnum = req.params.rgnum; // Get registration number from route parameter
    const leaveData = req.body; // Get leave application data from request body

    // Add registration number to leave application data
    leaveData.rgnum = rgnum;

    // Create a new leave application document in the database
    const newLeave = await leaveModel.create(leaveData);

    // Send a success response
    res.status(201).json({ message: "Leave application submitted successfully", data: newLeave });
  } catch (error) {
    // Handle any errors that occur during leave application submission
    console.error("Error submitting leave application:", error);
    // Send an error response
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email in the database
    const user = await studentModel.findOne({ email });

    // If user not found or password doesn't match, respond with an error
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // If user is found and password matches, respond with success
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.get('/updateprofile/:rgnum', async (req, res) => {
  const rgnum = req.params.rgnum;

  try {
    const user = await enrollModel.findOne({ rgnum: rgnum });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Assuming you have express and mongoose imported and a schema defined for users

// Update user profile route
app.post('/updateprofile', async (req, res) => {
  try {
      const { rgnum, name, email, password, phone } = req.body;

      // Update user profile in the database
      await enrollModel.findOneAndUpdate({ rgnum }, { name, email, password, phone });

      res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/changepassword/:rgnum', async (req, res) => {
  try {
      const { newPassword, confirmPassword } = req.body;
      const rgnum = req.params.rgnum;

      // Check if new password and confirm password match
      if (newPassword !== confirmPassword) {
          return res.status(400).json({ error: 'New password and confirm password do not match' });
      }

      // Update user's password in the database
      const updatedUser = await enrollModel.findOneAndUpdate({ rgnum }, { password: newPassword });

      if (!updatedUser) {
          return res.status(404).json({ error: 'User not found' });
      }

      // Password updated successfully
      res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
      console.error('Error changing password:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/sendemails', async (req, res) => {
  try {
      // Extract subject, message, and students data from the request body
      const { subject, message, students } = req.body;

      // Create a transporter to send emails (configure according to your email provider)
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'vv@gmail.com', // Your email address
              pass: 'vvvJ10Vg' // Your email password
          }
      });

      // Loop through each student and send an email
      for (const student of students) {
          const mailOptions = {
              from: 'vv@gmail.com',
              to: student.email, // Assuming each student object has an 'email' property
              subject: subject,
              text: message
          };

          // Send the email
          await transporter.sendMail(mailOptions);
      }

      // Send a success response
      res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
      // Send an error response if any error occurs
      console.error('Error sending emails:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/updateprofile', async (req, res) => {
  try {
    const users = await enrollModel.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/leaveapproval', async (req, res) => {
  try {
    const users = await leaveModel.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.post('/studentlogin', async (req, res) => {
  const { rgnum, password } = req.body;

  try {
    // Find the user by email in the database
    const user = await enrollModel.findOne({ rgnum });

    // If user not found or password doesn't match, respond with an error
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid rgnum or password' });
    }

    // If user is found and password matches, respond with success
    res.status(200).json({ message: 'Student Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.put('/block', async (req, res) => {
  const { rgnum, password } = req.body;

  try {
    // Find the user by email in the database
    const user = await enrollModel.findOne({ rgnum });

    // If user not found or password doesn't match, respond with an error
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid rgnum or password' });
    }

    // If user is found and password matches, respond with success
    res.status(200).json({ message: 'Student Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get("/getsignup", (req, res) => {
  studentModel.find().then((result) => {
    res.send(result)
  })
    .catch((err) => {
      res.send(err)
    })
});

app.listen(PORT, () => console.log("Server started on the PORT", PORT));