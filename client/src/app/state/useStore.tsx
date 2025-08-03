import { create } from 'zustand';

type Store = {
  componentKey: string;
  componentSection: string;
  isEditing: boolean;
  setComponentKey: (newComponentKey: string) => void;
  // setComponentSection: (newComponentSection: string) => void;
  setIsEditing: (newIsEditing: boolean) => void;
};

const useStore = create<Store>((set) => ({
  componentKey: '',
  componentSection: '',
  isEditing: false,
  
  setComponentKey: (newComponentKey: string) => {
    set({ componentKey: newComponentKey });
  },
  
  // setComponentSection: (newComponentSection: string) => {
  //   set({ componentSection: newComponentSection });
  // },
  
  setIsEditing: (newIsEditing: boolean) => {
    set({ isEditing: newIsEditing });
  },

}));

export default useStore;