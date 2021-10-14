const express = require('express');
const User = require('../models/User')
const router = express.Router();
var bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Iamagoodgirl';
const fetchuser = require('../middleware/fetchuser')

// ROUTE - 1
// Create a User using: POST "/api/auth/createuser". Doesn't Require Auth.
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
],
  async (req, res) => {
    let success = false;
    // Return errors and Bad Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return res.status(400).json({success, error: 'Email already registered' })
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      // console.log(jwtData);
      res.json({success,authToken});

      // res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).send("Interal Server Error");
    }
  }
);


// ROUTE - 2
// authenticate a user using post: no login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', "Enter your password").exists(),
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false;
      return res.status(400).json({ errors: "Invalid Credential" });
    }
    const passwordcompare = await bcrypt.compare(password, user.password);
    if (!passwordcompare) {
      success = false;
      return res.status(400).json({ success, errors: "Invalid Credential" });
    }

    const data = {
      user: {
        id: user.id
      }
    }

    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authToken });
  } catch (error) {
    console.log(error);
    res.status(500).send("Interal Server Error");
  }
});


// ROUTE - 3
// Get user details - login required.
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findOne(userId.id).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Interal Server Error");
  }
}
)

module.exports = router;
