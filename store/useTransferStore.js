// store/transferStore.js
import { create } from 'zustand';

const useTransferStore = create((set) => ({
  amount: 0,
  beneficiaryName: '',
  accountNumber: '',
  bankName: '',
  setTransferDetails: ({ amount, beneficiaryName, accountNumber, bankName }) => set({ amount, beneficiaryName, accountNumber, bankName }),
}));

export default useTransferStore;
