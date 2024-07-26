
import { RouterProvider } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import SignInContext from './components/support/SupportContext';
import { AuthProvider } from './Context/AuthContext';


function App() {

  return (
    <div className='App'>
      <AuthProvider>
        <RouterProvider router={AppRouter} />
      </AuthProvider>
    </div>

  );
}

export default App;