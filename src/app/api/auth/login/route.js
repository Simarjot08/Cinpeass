import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/config/db';
import User from '@/app/lib/models/userModel';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(password);
      console.log(user.password);
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Create access token (short expiry)
    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '45m' }
    );

    // Create refresh token (long expiry)
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    // Save refresh token in DB
    user.refreshTokens.push(refreshToken);
    await user.save();

    console.log("User isAdmin status:", user.isAdmin);

    const response = NextResponse.json(
      { message: 'Login successful',
        redirectUrl: user.email=="admin23@gmail.com" ? '/admin' : '/',
       }
    );

    // Set HTTP-only cookies
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 15, // 15 minutes
      path: '/',
      // sameSite: 'strict',
        sameSite: 'lax',
    });

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
      sameSite: 'strict',
    });


    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}