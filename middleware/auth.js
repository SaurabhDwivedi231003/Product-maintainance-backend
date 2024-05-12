const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Extract the JWT token from the authorization header
    const token = req.headers.authorization.split(' ')[1];
    
    // Verify the JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the user ID from the token to the request object
    req.userData = { userId: decodedToken.userId }; 

    // Check if the request path is for authentication
    if (req.path === '/signin' || req.path === '/signup') {
      // Skip authentication middleware for signin and signup routes
      return next();
    }

    // For other routes, ensure that the user is authenticated
    if (!decodedToken.userId) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Proceed to the next middleware if the user is authenticated
    next();
  } catch (error) {
    // Return an error response if authentication fails
    return res.status(401).json({ message: 'Authentication failed' });
  }
};
