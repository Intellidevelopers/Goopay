// transactionStore.js
import { create } from 'zustand';


const useTransactionStore = create((set) => ({
    selectedTransaction: null,
    setSelectedTransaction: (transaction) => set({ selectedTransaction: transaction }),
  }));
  
  export default useTransactionStore;
  
