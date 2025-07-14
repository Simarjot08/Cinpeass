// import { cookies } from 'next/headers';
// import jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET;

// export const verifyTokenFromCookie = () => {
//   const cookieStore = cookies();
//   const token = cookieStore.get('accessToken')?.value;

//   if (!token) {
//     throw new Error('No token provided');
//   }

//   const decoded = jwt.verify(token, JWT_SECRET);
//   return decoded.userId; // or decoded.id depending on what you encoded
// };

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyTokenFromCookie = async () => {
  const cookieStore = await cookies();  // <-- await here
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    throw new Error('No token provided');
  }

  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded.userId; // or decoded.id depending on what you encoded
};
