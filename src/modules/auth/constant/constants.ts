require('dotenv').config();
export const jwtConstant = {
  secret: process.env.JWT_SECRET || 'temukita2025',
  expireIn: process.env.JWT_EXPIRE_IN || '24h',
};
