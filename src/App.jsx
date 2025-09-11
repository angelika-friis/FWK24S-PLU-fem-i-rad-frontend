import { BrowserRouter } from 'react-router-dom';
import AppProvider from './providers/AppProvider.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

import AppTemplate from "./templates/AppTemplate"

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppTemplate>
          <AppRoutes />
        </AppTemplate>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App