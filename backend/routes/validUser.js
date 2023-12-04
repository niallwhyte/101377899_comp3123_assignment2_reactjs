// const User = require('./models/Users'); // Replace with your user model

// async function isValidUser(req, res, next) {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({ username, password });

//     if (user) {
//       req.user = user;
//       next(); // User is authenticated, proceed to the next middleware/route
//     } else {
//       res.status(401).json({ message: 'Invalid credentials' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// }

// module.exports = { isValidUser };