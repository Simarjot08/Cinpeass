import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/config/db';
import User from '@/app/lib/models/userModel';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  try {
    await connectDB();

    const refreshToken = req.cookies.get('refreshToken')?.value;
    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token provided' }, { status: 401 });
    }

    // Verify refresh token
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch {
      return NextResponse.json({ error: 'Invalid refresh token' }, { status: 403 });
    }

    // Find user and check if refresh token is in DB
    const user = await User.findById(decoded.userId);
    if (!user || !user.refreshTokens.includes(refreshToken)) {
      return NextResponse.json({ error: 'Refresh token not recognized' }, { status: 403 });
    }

    // Create new access token
    const newAccessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    const response = NextResponse.json({ message: 'Token refreshed' });

    response.cookies.set('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 15,
      path: '/',
      sameSite: 'strict',
    });

    return response;
  } catch (error) {
    console.error('Refresh token error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
