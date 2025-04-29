'use server';

import { db, auth } from '@/firebase/admin';
import { cookies } from 'next/headers';

const ONE_WEEK = 60 * 60 * 24 * 7 * 1000; // 7 days in milliseconds

export async function signUp(params: SignUpParams) {
  const { uid, name, email, password } = params;

  try {
    const userRecord = await db.collection('users').doc(uid).get();

    if (userRecord.exists) {
      return {
        success: false,
        message: 'User already exists, please sign in',
      };
    }

    await db.collection('users').doc(uid).set({
      name,
      email,
    });

    return {
      success: true,
      message: 'User created successfully',
    };
  } catch (e: any) {
    console.log('Error creating a user', e);

    if (e.code === 'auth/email-already-in-use') {
      return {
        success: false,
        message: 'Email already in use',
      };
    }

    return {
      success: false,
      message: 'Error, failed to create an account',
    };
  }
}
// Duplicate function removed

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    await setSessionCookie(idToken);
  } catch (e) {
    console.log('Error signing in', e);
    return {
      success: false,
      message: 'Error signing in',
    };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK, // 7 days,
  });

  cookieStore.set('session', sessionCookie, {
    maxAge: ONE_WEEK, // 7 days,
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'production',
    path: '/',
    sameSite: 'lax',
  });
}
