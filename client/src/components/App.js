import Header from './header/Header'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import CreateTimeLine from './pages/CreateTimeLine';
import Main from './main/Main';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"}>
            <Header/>
            <Main/>
          </Route>
          <Route path={"/authorization"}>
            <SignUpPage/>
          </Route>
          <Route path={"/login"}>
            <SignInPage/>
          </Route>
          <Route path={"/createTimeLine"}>
            <CreateTimeLine/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
