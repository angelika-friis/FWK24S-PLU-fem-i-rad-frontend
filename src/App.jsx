import { BrowserRouter } from 'react-router-dom';
import AppProvider from './providers/AppProvider.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

import AppTemplate from "./templates/AppTemplate"

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppTemplate>
          <AppRoutes />
        </AppTemplate>

      </AppProvider>
    </BrowserRouter>
  )
}

export default App