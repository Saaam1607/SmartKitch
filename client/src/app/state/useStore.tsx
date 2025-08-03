import { create } from 'zustand';

type Store = {
  componentKey: string;
  componentSection: string;
  isEditing: bool;
  setComponentKey: (newComponentKey: string) => void;
  // setComponentSection: (newComponentSection: string) => void;
  setIsEditing: (newIsEditing: bool) => void;
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
  
  setIsEditing: (newIsEditing: bool) => {
    set({ isEditing: newIsEditing });
  },

}));

export default useStore;