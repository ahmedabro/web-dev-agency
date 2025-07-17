import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../redux/features/themeSlice';

const ThemeToggler = () => {
    const dispatch = useDispatch();
    const currentTheme = useSelector((state) => state.theme.mode);
  
    return (
      <div>
        <button
          onClick={() => dispatch(setTheme('light'))}
        >
          Light
        </button>
        <button
          onClick={() => dispatch(setTheme('dark'))}
        >
          Dark
        </button>
        <button
          onClick={() => dispatch(setTheme('system'))}
        >
          System
        </button>
      </div>
    );
}

export default ThemeToggler
