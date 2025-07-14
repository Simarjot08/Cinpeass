import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/config/db';
import User from '@/app/lib/models/userModel';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    await connectDB();

    const refreshToken = req.cookies.get('refreshToken')?.value;
    if (!refreshToken) {
      return NextResponse.json({ message: 'No refresh token found' });
    }

    // Verify refresh token to get userId
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch {
      // Just clear cookies anyway
      const response = NextResponse.json({ message: 'Logged out' });
      response.cookies.delete('accessToken', { path: '/' });
      response.cookies.delete('refreshToken', { path: '/' });
      return response;
    }

    // Remove refresh token from DB
    const user = await User.findById(decoded.userId);
    if (user) {
      user.refreshTokens = user.refreshTokens.filter(token => token !== refreshToken);
      await user.save();
    }

    // Clear cookies
    const response = NextResponse.json({ message: 'Logged out' });
    response.cookies.delete('accessToken', { path: '/' });
    response.cookies.delete('refreshToken', { path: '/' });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}