import { BrowserRouter } from 'react-router-dom';
import AppProvider from './providers/AppProvider.jsx';
import Router from './routes/router.jsx';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
          <Router />
      </AppProvider>
    </BrowserRouter>
  )
}

export default App