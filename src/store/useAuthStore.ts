import { create } from 'zustand'

type OverflowType = 'hidden' | 'visible' | 'scroll'

type BodyStore = {
	iv: string,
	setIV: (x: string) => void
}

export const useAuthStore = create<BodyStore>(set => ({
	iv: '',
	setIV: x => set({iv: x})
}))