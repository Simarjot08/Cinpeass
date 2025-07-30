import { NextResponse } from 'next/server';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/app/lib/config/db';
import User from '@/app/lib/models/userModel';
 
export async function GET(req) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
 
  if (!code) {
    return NextResponse.json({ error: 'Missing code' }, { status: 400 });
  }
 
  try {
    // 1. Exchange code for tokens
    const { data: tokenRes } = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    });
 
    // 2. Get user info
    const { data: googleUser } = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenRes.access_token}` },
    });
 
    const { email, name, id: googleId, picture } = googleUser;
 
    // 3. Connect DB and find/create user
    await connectDB();
    let user = await User.findOne({ email });



 
    if (!user) {
      user = await User.create({ email, name, googleId, provider: 'google', password: '' });
    } else if (user.provider !== 'google') {
     
      return NextResponse.json({ error: 'Email registered by password. Please login with password.' }, { status: 400 });
    }
 
    // 4. Issue JWT tokens
    const accessToken = jwt.sign({ userId: user._id, email }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
 
    user.refreshTokens = [...(user.refreshTokens || []), refreshToken];
    await user.save();
 
    // 5. Set cookies and redirect
    const res = NextResponse.redirect(new URL('/', req.url));
    res.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60,
      path: '/',
      sameSite: 'strict',
    });
    res.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
      sameSite: 'strict',
    });
 
    return res;
  }catch (error) {
  console.error('Google OAuth error:', {
    message: error.message,
    response: error.response?.data,
    status: error.response?.status,
    url: error.config?.url,
    requestData: error.config?.data,
  });
 
  return NextResponse.json({ error: 'OAuth error' }, { status: 500 });
}
 
}
 