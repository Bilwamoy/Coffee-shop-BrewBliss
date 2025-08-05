// Enhanced Firebase Authentication with COOP error handling
import { 
  Auth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect, 
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { getAuthInstance } from "./config";

// Enhanced Google Auth Provider configuration
const createGoogleProvider = () => {
  const provider = new GoogleAuthProvider();
  
  // Add additional scopes if needed
  provider.addScope('email');
  provider.addScope('profile');
  
  // Set custom parameters to avoid COOP issues
  provider.setCustomParameters({
    prompt: 'select_account',
    // Force popup mode to avoid redirect issues
    display: 'popup'
  });
  
  return provider;
};

// Check if popup is supported and not blocked
const isPopupSupported = (): boolean => {
  try {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return false;
    
    // Check if popup is blocked by testing a small popup
    const testPopup = window.open('', '_blank', 'width=1,height=1');
    if (testPopup) {
      testPopup.close();
      return true;
    }
    return false;
  } catch (error) {
    console.warn('Popup test failed:', error);
    return false;
  }
};

// Enhanced Google Sign-In with fallback mechanisms
export const signInWithGoogle = async (): Promise<{ success: boolean; error?: string; user?: User }> => {
  try {
    const auth = await getAuthInstance();
    if (!auth) {
      return { success: false, error: 'Authentication service is not available' };
    }

    const provider = createGoogleProvider();
    
    // First, try popup method if supported
    if (isPopupSupported()) {
      try {
        console.log('Attempting popup sign-in...');
        const result = await signInWithPopup(auth, provider);
        return { success: true, user: result.user };
      } catch (popupError: any) {
        console.warn('Popup sign-in failed:', popupError);
        
        // If popup was closed by user, don't try redirect
        if (popupError.code === 'auth/popup-closed-by-user') {
          return { success: false, error: 'Sign-in was cancelled. Please try again.' };
        }
        
        // If popup was blocked or COOP error, try redirect
        if (
          popupError.code === 'auth/popup-blocked' || 
          popupError.message?.includes('Cross-Origin-Opener-Policy') ||
          popupError.message?.includes('popup')
        ) {
          console.log('Popup blocked, trying redirect method...');
          await signInWithRedirect(auth, provider);
          return { success: true }; // Redirect will handle the rest
        }
        
        throw popupError; // Re-throw other errors
      }
    } else {
      // If popup is not supported, use redirect
      console.log('Popup not supported, using redirect method...');
      await signInWithRedirect(auth, provider);
      return { success: true }; // Redirect will handle the rest
    }
  } catch (error: any) {
    console.error('Google sign-in error:', error);
    
    let errorMessage = 'Failed to sign in with Google. Please try again.';
    
    if (error.code === 'auth/popup-closed-by-user') {
      errorMessage = 'Sign-in was cancelled. Please try again.';
    } else if (error.code === 'auth/popup-blocked') {
      errorMessage = 'Popup was blocked. Please allow popups for this site or try again.';
    } else if (error.code === 'auth/network-request-failed') {
      errorMessage = 'Network error. Please check your connection and try again.';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Too many attempts. Please wait a moment and try again.';
    }
    
    return { success: false, error: errorMessage };
  }
};

// Handle redirect result on page load
export const handleRedirectResult = async (): Promise<{ success: boolean; user?: User; error?: string }> => {
  try {
    const auth = await getAuthInstance();
    if (!auth) {
      return { success: false, error: 'Authentication service is not available' };
    }

    const result = await getRedirectResult(auth);
    if (result && result.user) {
      console.log('Redirect sign-in successful');
      return { success: true, user: result.user };
    }
    
    return { success: false };
  } catch (error: any) {
    console.error('Redirect result error:', error);
    return { success: false, error: error.message };
  }
};

// Enhanced email/password sign-in
export const signInWithEmail = async (email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> => {
  try {
    const auth = await getAuthInstance();
    if (!auth) {
      return { success: false, error: 'Authentication service is not available' };
    }

    const result = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: result.user };
  } catch (error: any) {
    console.error('Email sign-in error:', error);
    
    let errorMessage = 'Failed to sign in. Please check your credentials.';
    
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'No account found with this email address.';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Incorrect password. Please try again.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address format.';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Too many failed attempts. Please wait and try again.';
    }
    
    return { success: false, error: errorMessage };
  }
};

// Enhanced email/password sign-up
export const signUpWithEmail = async (email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> => {
  try {
    const auth = await getAuthInstance();
    if (!auth) {
      return { success: false, error: 'Authentication service is not available' };
    }

    const result = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: result.user };
  } catch (error: any) {
    console.error('Email sign-up error:', error);
    
    let errorMessage = 'Failed to create account. Please try again.';
    
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'An account with this email already exists.';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Password is too weak. Please use at least 6 characters.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address format.';
    }
    
    return { success: false, error: errorMessage };
  }
};

// Enhanced sign out
export const signOutUser = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    const auth = await getAuthInstance();
    if (!auth) {
      return { success: false, error: 'Authentication service is not available' };
    }

    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    console.error('Sign out error:', error);
    return { success: false, error: 'Failed to sign out. Please try again.' };
  }
};

// Auth state listener
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return new Promise<() => void>(async (resolve) => {
    const auth = await getAuthInstance();
    if (!auth) {
      callback(null);
      resolve(() => {});
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, callback);
    resolve(unsubscribe);
  });
};