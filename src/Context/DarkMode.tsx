import React, {createContext, useState} from 'react';

export const DarkModeContext = createContext({});
export const DarkModeProvider = ({children}) => {
  const [toggle, setToggle] = useState(false);

  function ChangeTheme() {
    if (toggle) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  }

  return (
    <DarkModeContext.Provider
      value={{
        toggle,
        ChangeTheme,
      }}>
      {children}
    </DarkModeContext.Provider>
  );
};
