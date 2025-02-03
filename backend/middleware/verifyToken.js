import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken) {
    // If there's no Access Token, try using the Refresh Token to get a new one
    if (!refreshToken) {
      return res.status(401).json({ success: false, message: "Unauthorized: No tokens provided" });
    }

    // Verify the Refresh Token
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ success: false, message: "Invalid refresh token" });
      }

      // Generate a new Access Token from the decoded refresh token
      const newAccessToken = jwt.sign(
        { userId: decoded.userId }, 
        process.env.JWT_ACCESS_SECRET, // Use JWT_ACCESS_SECRET for the access token
        { expiresIn: '1h' } // 1 hour expiration for access token
      );

      // Set the new Access Token in the cookies
      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensure HTTPS in production
        sameSite: 'strict',
        maxAge: 1 * 60 * 60 * 1000, // 1 hour expiration
      });

      // Optionally, you can add the userId to the request object
      req.userId = decoded.userId;

      // Proceed with the request after the new token is issued
      return next();
    });
  } else {
    // If Access Token exists, verify it directly
    jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ success: false, message: "Invalid access token" });
      }

      // Add the userId from the Access Token to the request object
      req.userId = decoded.userId;

      // Proceed to the next middleware/handler
      next();
    });
  }
};
