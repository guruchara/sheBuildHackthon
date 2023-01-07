import {createRoot} from 'react-dom/client';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  ReactReduxFirebaseProvider,
} from 'react-redux-firebase'
import store, {rrfProps} from './../src/store';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// 👇️ wrap App in Router

root.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Router>
    <App />
    </Router>
    </ReactReduxFirebaseProvider>
    </Provider>
);

