import AppProvider from './providers/AppProvider.jsx';
import Router from './routes/router.jsx';

function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  )
}

export default App