import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { getAuth } from 'firebase-admin/auth'; // For backend token verification
import { initializeApp, getApps, cert } from 'firebase-admin/app'; // For Firebase Admin SDK
import { getStorage } from 'firebase-admin/storage'; // For Firebase Admin SDK Storage
import path from 'path';

// Initialize Firebase Admin SDK if not already initialized
if (!getApps().length) {
  let serviceAccount;

  if (process.env.NODE_ENV === 'development') {
    // In development, load from file
    // IMPORTANT: Place your serviceAccountKey.json in the root of your brewbliss project
    // and ensure it's NOT committed to Git.
    try {
      serviceAccount = require(path.resolve(process.cwd(), 'serviceAccountKey.json'));
    } catch (error) {
      console.error("Error loading serviceAccountKey.json in development:", error);
      throw new Error("Missing serviceAccountKey.json for Firebase Admin SDK in development.");
    }
  } else {
    // In production (e.g., Vercel), parse from environment variable
    // Vercel recommends using a base64 encoded string for multi-line secrets.
    const serviceAccountBase64 = process.env.FIREBASE_ADMIN_SDK_CONFIG;
    if (!serviceAccountBase64) {
      throw new Error("FIREBASE_ADMIN_SDK_CONFIG environment variable is not set in production.");
    }
    serviceAccount = JSON.parse(Buffer.from(serviceAccountBase64, 'base64').toString('utf8'));
  }

  initializeApp({
    credential: cert(serviceAccount),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET, // Your Firebase Storage bucket
  });
}

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("brewbliss_db"); // Replace with your database name

    const posts = await db.collection("posts").find({}).sort({ timestamp: -1 }).toArray();
    return NextResponse.json(posts);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("brewbliss_db"); // Replace with your database name

    const body = await request.json();
    const { base64Image, caption } = body;
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized: No token provided' }, { status: 401 });
    }

    const idToken = authHeader.split('Bearer ')[1];

    // Verify Firebase ID token
    let decodedToken;
    try {
      decodedToken = await getAuth().verifyIdToken(idToken);
    } catch (error) {
      console.error("Error verifying Firebase ID token:", error);
      return NextResponse.json({ message: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    const userId = decodedToken.uid;
    const username = decodedToken.name || decodedToken.email || "Anonymous";
    const userAvatar = decodedToken.picture || ""; // Or a default avatar URL

    // Upload image to Firebase Storage
    const bucket = getStorage().bucket();
    const fileName = `posts/${userId}/${Date.now()}.png`;
    const file = bucket.file(fileName);

    // Convert base64 to buffer
    const base64EncodedImageString = base64Image.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(base64EncodedImageString, 'base64');

    await file.save(imageBuffer, {
      metadata: { contentType: 'image/png' },
      public: true, // Make the image publicly accessible
    });

    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    const newPost = {
      userId,
      username,
      userAvatar,
      imageUrl,
      caption,
      likes: [],
      timestamp: new Date(),
    };

    const result = await db.collection("posts").insertOne(newPost);
    return NextResponse.json({ message: "Post added successfully", postId: result.insertedId }, { status: 201 });

  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'Failed to create post' }, { status: 500 });
  }
}