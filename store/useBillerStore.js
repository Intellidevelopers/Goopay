// useBillerStore.js
import { create } from 'zustand';

const useBillerStore = create((set) => ({
  selectedBiller: null,
  setSelectedBiller: (biller) => set({ selectedBiller: biller }),
}));

export default useBillerStore;
