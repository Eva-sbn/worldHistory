import Header from './header/Header'
import TimeLine from './timeLine/TimeLine'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route exact path={"/authorization"}>
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
