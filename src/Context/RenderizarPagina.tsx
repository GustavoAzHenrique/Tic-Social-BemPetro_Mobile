import React, {createContext, useState} from 'react';

export const RenderPageContext = createContext({});
export const RenderProvider = ({children}) => {
  const [renderPage, setRenderPage] = useState(false);

  function ChangeRender() {
    if (renderPage) {
        setRenderPage(false);
    } else {
        setRenderPage(true);
    }
  }

  return (
    <RenderPageContext.Provider
      value={{
        renderPage,
        ChangeRender,
      }}>
      {children}
    </RenderPageContext.Provider>
  );
};