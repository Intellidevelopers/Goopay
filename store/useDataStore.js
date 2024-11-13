// useDataStore.js
import {create} from 'zustand';

const useDataStore = create((set) => ({
  selectedNetwork: null,
  selectedDataPlan: '',
  selectedAmount: '',
  phoneNumber: '',
  setSelectedNetwork: (network) => set({ selectedNetwork: network }),
  setSelectedDataPlan: (plan) => set({ selectedDataPlan: plan }),
  setSelectedAmount: (amount) => set({ selectedAmount: amount }),
  setPhoneNumber: (number) => set({ phoneNumber: number }),
}));

export default useDataStore;
