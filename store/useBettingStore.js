// useBettingStore.js
import { create } from 'zustand';

const useBettingStore = create((set) => ({
  selectedBiller: null,
  setSelectedBiller: (biller) => set({ selectedBiller: biller }),
}));

export default useBettingStore;
