import create from 'zustand';

const useOrderStore = create((set) => ({
  order: null,
  setOrder: (order) => set({ order }),
}));

export default useOrderStore;
