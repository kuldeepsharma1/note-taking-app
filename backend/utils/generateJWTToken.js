import jwt from 'jsonwebtoken';

export const generateJWTToken = (res, userId) => {
  // Access Token is valid for 1 hour

  const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '1h' // short lived token
  });

  
  // Refresh Token is valid for 7 days
  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d' // long lived token
  });


  // store Access Token in an HTTP-only cookie
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // cookie will only be set in production
    sameSite: 'strict',
    maxAge: 3600000, // 1 hour
  });

  // store Refresh Token in an HTTP-only cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // cookie will only be set in production
    sameSite: 'strict',
    maxAge: 604800000, // 7 days
  })

  //Return the Access Token you can return the Refresh Token as well
  return { accessToken, refreshToken };

};