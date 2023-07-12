import { NextResponse } from 'next/server';

export const config = {
  runtime: 'edge'
};

export async function GET() {
  return NextResponse.json({ ok: true });
}
