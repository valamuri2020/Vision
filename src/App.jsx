import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Dashboard } from "./components/dashboard/dashboard";
import { SignIn } from "./components/signIn/signIn";
import { Register } from "./components/register/register.jsx";
import { List } from "./components/list/list";
import { ForgotPassword } from "./components/forgot-password/forgotPassword";
import { Info } from "./components/info/info";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute path="/" exact component={Dashboard}></PrivateRoute>
            <Route path="/register" component={Register}></Route>
            <Route path="/signin" component={SignIn}></Route>
            <Route path="/list/:id?" component={List}></Route>
            <Route path="/forgot-password" component={ForgotPassword}></Route>
            <Route path="/info" component={Info}></Route>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
