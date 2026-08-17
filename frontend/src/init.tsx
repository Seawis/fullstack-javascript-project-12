import { Provider, ErrorBoundary } from '@rollbar/react';
import App from './App';

const rollbarConfig = {
  accessToken: process.env.VITE_ROLLBAR_ACCESS_TOKEN, // or REACT_APP_ROLLBAR_ACCESS_TOKEN
  environment: process.env.NODE_ENV || 'development',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

function Main() {
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary
        fallbackUI={() => (
          <div style={{ padding: '20px', color: 'red' }}>
            <h2>Oops, something went wrong.</h2>
            <p>We've been notified and are looking into it.</p>
          </div>
        )}
      >
        <App />
      </ErrorBoundary>
    </Provider>
  );
}

export default Main;