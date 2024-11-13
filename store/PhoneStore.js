// PhoneStore.js
import { create } from 'zustand';

const phoneStore = create((set) => ({
  phoneNumber: '',
  setPhoneNumber: (number) => set({ phoneNumber: number }),
}));

export default phoneStore;