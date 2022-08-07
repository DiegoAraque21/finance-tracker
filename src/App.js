import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
// Components
import Navbar from './components/Navbar';
// Pages
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/">
              {!user && <Redirect to="/login" />}
              {user && <Home />}
            </Route>
            <Route exact path="/login">
              {user && <Redirect to="/" />}
              {!user && <Login />}
            </Route>
            <Route exact path="/signup">
              {user && <Redirect to="/" />}
              {!user && <Signup />}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
