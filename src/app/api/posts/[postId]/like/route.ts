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

    const { postId } = context.params;
    const body = await request.json();
    const { userId } = body; // This userId is from the frontend, we'll verify it with the token

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

    // Ensure the userId from the request body matches the authenticated user's UID
    if (decodedToken.uid !== userId) {
      return NextResponse.json({ message: 'Unauthorized: User ID mismatch' }, { status: 403 });
    }

    const postsCollection = db.collection("posts");
    const post = await postsCollection.findOne({ _id: new ObjectId(postId) });

    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    const currentLikes = post.likes || [];
    const hasLiked = currentLikes.includes(userId);

    let updatedLikes;
    if (hasLiked) {
      updatedLikes = currentLikes.filter((id: string) => id !== userId);
    } else {
      updatedLikes = [...currentLikes, userId];
    }

    await postsCollection.updateOne(
      { _id: new ObjectId(postId) },
      { $set: { likes: updatedLikes } }
    );

    return NextResponse.json({ message: 'Like status updated', likes: updatedLikes });

  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'Failed to update like status' }, { status: 500 });
  }
}