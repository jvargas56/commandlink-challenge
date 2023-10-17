// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';

// Mock useRouter
jest.mock('next/navigation', () => {
  return {
    useRouter: jest.fn(() => ({
      push: jest.fn(),
      replace: jest.fn(),
      reload: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      back: jest.fn(),
      beforePopState: jest.fn(),
      basePath: '',
      pathname: '/',
      query: {},
      asPath: '',
      route: '',
    })),
  };
});

// Mock the redux store for your tests
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './app/store/reducers/formReducer';
import { render as rtlRender } from '@testing-library/react';

function render(
  ui,
  {
    initialState,
    store = createStore(rootReducer, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';

export { render };