import AppProvider from './providers/AppProvider.jsx';
import Router from './routes/Router.jsx';

function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  )
}

export default App