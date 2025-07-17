import { createSlice } from '@reduxjs/toolkit';

// System theme detection
const getSystemTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';


  const applyThemeToDOM = (theme) => {
    const root = document.documentElement;
  
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

// Get initial theme
const getInitialTheme = () => {
    const stored = localStorage.getItem('theme');
    const theme = stored === 'light' || stored === 'dark' ? stored : getSystemTheme();
    applyThemeToDOM(theme); 
    return theme;
  };

const initialState = {
  mode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      const theme = action.payload; 
      if (theme === 'system') {
        localStorage.removeItem('theme');
        const systemTheme = getSystemTheme();
        applyThemeToDOM(systemTheme);
        state.mode = systemTheme;
      } else {
        localStorage.setItem('theme', theme);
        applyThemeToDOM(theme);
        state.mode = theme;
      }
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;