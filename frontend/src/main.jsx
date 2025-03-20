import { createRoot } from 'react-dom/client'
import App from './App';
import '../src/index.css'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './state/store';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}> 
    <App />
  </Provider>  
  </BrowserRouter>,
)
