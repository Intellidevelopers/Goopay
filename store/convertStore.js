// store/convertStore.js
import {create} from 'zustand';

const convertStore = create((set) => ({
  airtimeDetails: {
    selectedAmount: 0,
    chargeFee: 0,
    calculatedCredit: 0,
  },
  setAirtimeDetails: (amount, fee, credit) =>
    set((state) => ({
      airtimeDetails: {
        selectedAmount: amount,
        chargeFee: fee,
        calculatedCredit: credit,
      },
    })),
}));

export default convertStore;
