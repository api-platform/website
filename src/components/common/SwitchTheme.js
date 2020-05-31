import React from 'react';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';

const SwitchTheme = () => (
  <ThemeToggler>
    {({ theme, toggleTheme }) => (
      <div className="switch-theme">
        <span className="switch-theme__icon" />
        <input
          id="switch-theme__input"
          name="switch-theme__input"
          className="switch-theme__input"
          type="checkbox"
          onChange={(e) => toggleTheme(e.target.checked ? 'dark' : 'light')}
          checked={'dark' === theme}
        />
        <label htmlFor="switch-theme__input" className="switch-theme__label">
          Switch to {'dark' === theme ? 'light mode' : 'dark mode'}
        </label>
      </div>
    )}
  </ThemeToggler>
);

export default SwitchTheme;
