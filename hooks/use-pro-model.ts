import { create } from "zustand";

interface UseProModelStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

export const useProModel = create<UseProModelStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));
