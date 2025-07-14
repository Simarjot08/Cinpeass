import { NextResponse } from 'next/server';
 import { connectDB } from '@/app/lib/config/db.js';
import User from '@/app/lib/models/userModel';
import bcrypt from "bcrypt";
export async function POST(req) {
  const { email, password,firstname,lastname } = await req.json();

  await connectDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashedPassword,firstname,lastname});

  return NextResponse.json({ success: true });
}
