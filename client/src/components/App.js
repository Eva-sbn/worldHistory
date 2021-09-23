import Header from './header/Header'
import TimeLine from './timeLine/TimeLine'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"}>
            <Header/>
            <TimeLine/>
          </Route>
          <Route path={"/authorization"}>
            <SignUpPage/>
          </Route>
          <Route path={"/login"}>
            <SignInPage/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
