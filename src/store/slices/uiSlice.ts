import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '@/data/dummyData';

interface UiState {
  searchQuery: string;
  selectedCategory: string | null;
  isSearchActive: boolean;
  isMobileMenuOpen: boolean;
  isCartOpen: boolean;
  cartItems: Book[];
}

const initialState: UiState = {
  searchQuery: '',
  selectedCategory: null,
  isSearchActive: false,
  isMobileMenuOpen: false,
  isCartOpen: false,
  cartItems: [],
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
    addToCart: (state, action: PayloadAction<Book>) => {
      const existingItem = state.cartItems.find(item => item._id === action.payload._id);
      if (!existingItem) {
        state.cartItems.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
    },
    clearCart: (state) => {
      state.cartItems = [];
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
  toggleCart,
  addToCart,
  removeFromCart,
  clearCart
} = uiSlice.actions;
export default uiSlice.reducer;