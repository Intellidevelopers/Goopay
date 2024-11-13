// useSignupStore.js
import { create } from 'zustand';

const useSignupStore = create((set) => ({
  firstName: '',
  lastName: '',
  phone: '',
  password: '',
  setFirstName: (firstName) => set({ firstName }),
  setLastName: (lastName) => set({ lastName }),
  setPhone: (phone) => set({ phone }),
  setPassword: (password) => set({ password }),
}));

export default useSignupStore;
