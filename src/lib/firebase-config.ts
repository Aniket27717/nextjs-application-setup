// Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCW87BPPsuA_AsNCzqfEEVFSvHF-SP100k",
  authDomain: "android-service-54676.firebaseapp.com",
  databaseURL: "https://android-service-54676-default-rtdb.firebaseio.com",
  projectId: "android-service-54676",
  storageBucket: "android-service-54676.firebasestorage.app",
  messagingSenderId: "446333235153",
  appId: "1:446333235153:web:f7366fd64166b83d5b3af0"
};

// User roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];
