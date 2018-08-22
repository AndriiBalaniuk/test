import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'reset.css';
import 'Styles/main.pcss';
import Root from './Root';


ReactDOM.render(
  <AppContainer>
    <Root />
  </AppContainer>,
  document.getElementById('root'),
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./Root', () => {
    ReactDOM.render(
      <AppContainer>
        <Root />
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}
