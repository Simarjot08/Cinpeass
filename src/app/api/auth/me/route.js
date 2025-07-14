import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  try {
    const accessToken = req.cookies.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json({ loggedIn: false }, { status: 200 });
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    return NextResponse.json({ loggedIn: true, user: decoded }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ loggedIn: false }, { status: 200 });
  }
}