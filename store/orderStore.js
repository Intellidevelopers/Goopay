import {create} from 'zustand';

const useOrderStore = create((set) => ({
  order: null, // Initial order state
  setOrder: (orderDetails) => set({ order: orderDetails }), // Function to update order
}));

export default useOrderStore;
