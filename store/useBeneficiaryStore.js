// store/useBeneficiaryStore.js
import {create} from 'zustand';

const useBeneficiaryStore = create((set) => ({
  accountNumber: '',
  bankName: '',
  beneficiaryName: '',
  setBeneficiaryDetails: ({ accountNumber, bankName, beneficiaryName }) =>
    set({ accountNumber, bankName, beneficiaryName }),
}));

export default useBeneficiaryStore;
