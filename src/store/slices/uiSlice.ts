import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  searchQuery: string;
  selectedCategory: string | null;
  isSearchActive: boolean;
  isMobileMenuOpen: boolean;
  isCartOpen: boolean;
}

const initialState: UiState = {
  searchQuery: '',
  selectedCategory: null,
  isSearchActive: false,
  isMobileMenuOpen: false,
  isCartOpen: false,
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
    setIsCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isCartOpen = action.payload;
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
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
  closeSearch,
  setIsCartOpen,
  toggleCart
} = uiSlice.actions;
export default uiSlice.reducer;