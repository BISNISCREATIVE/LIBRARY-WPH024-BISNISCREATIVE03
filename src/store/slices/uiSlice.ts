import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  searchQuery: string;
  selectedCategory: string | null;
  isSearchActive: boolean;
  isMobileMenuOpen: boolean;
}

const initialState: UiState = {
  searchQuery: '',
  selectedCategory: null,
  isSearchActive: false,
  isMobileMenuOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    toggleSearch: (state) => {
      state.isSearchActive = !state.isSearchActive;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeSearch: (state) => {
      state.isSearchActive = false;
      state.searchQuery = '';
    },
  },
});

export const { 
  setSearchQuery, 
  setSelectedCategory, 
  toggleSearch, 
  toggleMobileMenu, 
  closeSearch 
} = uiSlice.actions;
export default uiSlice.reducer;