import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Dashboard } from "./components/dashboard/dashboard";
import { SignIn } from "./components/signIn/signIn";
import { Register } from "./components/register/register.jsx";
import { List } from "./components/list/list";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={SignIn}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/dashboard" component={Dashboard}></Route>
          <Route path="/list/:id" component={List}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
