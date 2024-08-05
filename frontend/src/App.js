
import { RouterProvider } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import SignInContext from './components/support/SupportContext';
import { AuthProvider } from './Context/AuthContext';


function App() {

  return (
    // <AuthProvider>
      <div className='App'>
        <RouterProvider router={AppRouter} />
      </div>
    // </AuthProvider>

  );
}

export default App;