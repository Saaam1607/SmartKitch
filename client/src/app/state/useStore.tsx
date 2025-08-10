import { create } from 'zustand';

type Store = {
  componentKey: string;
  setComponentKey: (newComponentKey: string) => boolean;
};

const useStore = create<Store>((set, get) => ({
  componentKey: '',

  resetComponentKey: () => {
    set({ componentKey: "" })
  },

  setComponentKey: (newComponentKey: string) => {
    const currentKey = get().componentKey;
    if (currentKey === "") {
      set({ componentKey: newComponentKey });
      return true;
    } else {
      return false;
    }
  },
}));

export default useStore;
