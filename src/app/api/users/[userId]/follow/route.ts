import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import path from 'path';

// Initialize Firebase Admin SDK if not already initialized
if (!getApps().length) {
  let serviceAccount;

  if (process.env.NODE_ENV === 'development') {
    // In development, load from file
    try {
      serviceAccount = require(path.resolve(process.cwd(), 'serviceAccountKey.json'));
    } catch (error) {
      console.error("Error loading serviceAccountKey.json in development:", error);
      throw new Error("Missing serviceAccountKey.json for Firebase Admin SDK in development.");
    }
  } else {
    // In production (e.g., Vercel), parse from environment variable
    const serviceAccountBase64 = process.env.FIREBASE_ADMIN_SDK_CONFIG;
    if (!serviceAccountBase64) {
      throw new Error("FIREBASE_ADMIN_SDK_CONFIG environment variable is not set in production.");
    }
    serviceAccount = JSON.parse(Buffer.from(serviceAccountBase64, 'base64').toString('utf8'));
  }

  initializeApp({
    credential: cert(serviceAccount),
  });
}

export async function POST(request: Request, context: any) {
  try {
    const client = await clientPromise;
    const db = client.db("brewbliss_db"); // Replace with your database name

    const { userId: followedId } = context.params; // The user being followed
    const body = await request.json();
    const { followerId } = body; // The user who is following

    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized: No token provided' }, { status: 401 });
    }
    const idToken = authHeader.split('Bearer ')[1];

    let decodedToken;
    try {
      decodedToken = await getAuth().verifyIdToken(idToken);
    } catch (error) {
      console.error("Error verifying Firebase ID token:", error);
      return NextResponse.json({ message: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    // Ensure the followerId from the request body matches the authenticated user's UID
    if (decodedToken.uid !== followerId) {
      return NextResponse.json({ message: 'Unauthorized: Follower ID mismatch' }, { status: 403 });
    }

    // Store follow relationship in a 'follows' collection
    await db.collection("follows").insertOne({
      followerId: followerId,
      followedId: followedId,
      timestamp: new Date(),
    });

    return NextResponse.json({ message: `Successfully followed user ${followedId}` }, { status: 200 });

  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'Failed to follow user' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: any) {
  try {
    const client = await clientPromise;
    const db = client.db("brewbliss_db"); // Replace with your database name

    const { userId: followedId } = context.params; // The user being unfollowed
    const body = await request.json();
    const { followerId } = body; // The user who is unfollowing

    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized: No token provided' }, { status: 401 });
    }
    const idToken = authHeader.split('Bearer ')[1];

    let decodedToken;
    try {
      decodedToken = await getAuth().verifyIdToken(idToken);
    } catch (error) {
      console.error("Error verifying Firebase ID token:", error);
      return NextResponse.json({ message: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    // Ensure the followerId from the request body matches the authenticated user's UID
    if (decodedToken.uid !== followerId) {
      return NextResponse.json({ message: 'Unauthorized: Follower ID mismatch' }, { status: 403 });
    }

    // Remove follow relationship from the 'follows' collection
    await db.collection("follows").deleteOne({
      followerId: followerId,
      followedId: followedId,
    });

    return NextResponse.json({ message: `Successfully unfollowed user ${followedId}` }, { status: 200 });

  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'Failed to unfollow user' }, { status: 500 });
  }
}