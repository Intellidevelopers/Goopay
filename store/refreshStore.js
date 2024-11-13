import { create } from 'zustand';

const useRefreshStore = create((set) => ({
  refreshKey: 0, // Initial value for the refresh key
  refresh: () => set((state) => ({ refreshKey: state.refreshKey + 1 })), // Function to update the key
}));

export default useRefreshStore;
