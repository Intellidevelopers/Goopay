import {create} from 'zustand';

const useWithdrawStore = create((set) => ({
  withdrawalDetails: {},
  setWithdrawalDetails: (details) =>
    set((state) => ({
      withdrawalDetails: { ...state.withdrawalDetails, ...details },
    })),
}));

export default useWithdrawStore;
