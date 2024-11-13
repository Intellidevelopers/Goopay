// store.js
import {create} from 'zustand';

const useStore = create((set) => ({
  amount: 0,
  setAmount: (amount) => set({ amount }),
}));

export default useStore;
