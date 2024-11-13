// authStore.js
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: true, // Set to true if the user is logged in initially
  logout: () => set({ isAuthenticated: false }), // Set isAuthenticated to false on logout
}));

export default useAuthStore;
