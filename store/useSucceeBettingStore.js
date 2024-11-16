// useBettingSuccessStore.js
import {create} from 'zustand';

const useSuccessBettingStore = create((set) => ({
  successBiller: null, // Holds the biller details after confirmation

  // Method to set the biller details
  setSuccessBiller: (biller) => set({ successBiller: biller }),

  // Method to clear the biller details
  clearSuccessBiller: () => set({ successBiller: null }),
}));

export default useSuccessBettingStore;