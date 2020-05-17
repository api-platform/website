import React from 'react';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';

const SwitchTheme = () => {
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
        <label htmlFor="switch-theme" className="label-switch-theme">
          <input
            id="switch-theme"
            name="switch-theme"
            className="switch-theme"
            type="checkbox"
            onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
            checked={'dark' === theme}
          />
          <span className="switch-theme-icon-theme" />
          <span className="switch-theme-icon-label"> Switch to {'dark' === theme ? 'light mode' : 'dark mode'}</span>
        </label>
      )}
    </ThemeToggler>
  );
};

export default SwitchTheme;
