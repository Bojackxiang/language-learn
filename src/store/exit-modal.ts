import { create } from 'zustand'

interface ExistModal {
  open: boolean;
  setOpen: () => void;
  setClose: () => void;
}

export const useExitModal = create<ExistModal>((set) => ({
  open: false,
  setOpen: () => set({ open: true }),
  setClose: () => set({ open: false }),
}))

