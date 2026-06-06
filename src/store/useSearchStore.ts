import { create } from 'zustand';

type CounterState = {
    isSearchInputShow: boolean;
    show: () => void;
    hide: () => void;
    searchTrigger: number;
    triggerSearch: () => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
};

export const useSearchStore = create<CounterState>(set => ({
    isSearchInputShow: false,
    show: () => set(() => ({ isSearchInputShow: true })),
    hide: () => set(() => ({ isSearchInputShow: false, searchQuery: '' })),
    searchTrigger: 0,
    triggerSearch: () => set(state => ({ searchTrigger: state.searchTrigger + 1 })),
    searchQuery: '',
    setSearchQuery: (query: string) => set({ searchQuery: query }),
}));