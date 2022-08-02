import React from 'react';
import Routes from './routes';
import {DarkModeProvider} from './Context/DarkMode';
import {UserInfoProvider} from './Context/UserInfoContext';
import {RenderProvider} from './Context/RenderizarPagina';

export default () => {
  return (
    <DarkModeProvider>
      <UserInfoProvider>
        <RenderProvider>
          <Routes />
        </RenderProvider>
      </UserInfoProvider>
    </DarkModeProvider>
  );
};
