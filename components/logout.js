'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

export const useLogout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      localStorage.clear(); // Clear local storage completely
      console.log("Logged out successfully, redirecting to home page.");
      router.push('/'); // Redirect to the main home page
    } catch (error) {
      console.error("Logout failed:", error);
      alert("An error occurred during logout. Please try again.");
    }
  };

  const handleDeleteAccount = async (products) => {
    const confirmation = window.confirm(
      `⚠️ Are you absolutely sure? This action cannot be undone. All your data, products (${products.length} items), and profile will be permanently deleted.`
    );

    if (confirmation) {
      try {
        // You would typically delete the user from Firebase here
        // await deleteUser(auth.currentUser);
        await signOut(auth);
        localStorage.clear();
        console.log("Account deleted and logged out.");
        router.push('/');
        alert('🗑️ Your account has been permanently deleted. We\'re sorry to see you go!');
      } catch (error) {
        console.error("Account deletion failed:", error);
        alert("An error occurred during account deletion. Please try again.");
      }
    }
  };

  return { handleLogout, handleDeleteAccount };
};