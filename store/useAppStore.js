// src/store/useAppStore.js
import create from 'zustand';

const useAppStore = create((set) => ({
  email: '',
  setEmail: (email) => set({ email }),
  
  password: '',
  setPassword: (password) => set({ password }),

  // Add more state variables and methods as needed
}));

export default useAppStore;
