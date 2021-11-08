import React, { useEffect, useState } from "react";
import { useLocation, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BackgroundSvg } from "./components/helpers/backgroungSvg";
import { Container } from "./components/layout/container";
import { SignIn } from "./pages/SignIn";
import { Dashboard } from "./pages/Dashboard";
import { TrainingDay } from "./pages/TrainingDay";
import { TrainingProgram } from "./pages/TrainingProgram";
import { TrainingToday } from "./pages/TrainingToday";
import { SignUp } from "./pages/SignUp";
import { setInitData, verifyToken } from "./actions/userActions";
import { PrivateRoute } from "./components/routes/privateRoute";
import { CSSTransition, TransitionGroup } from "react-transition-group"

function App() {

  const location = useLocation()

  // Getting 'user'-state from the global store
  const user = useSelector((state) => state.user)

  // Creating logged-in state
  const [loggedIn, setLoggedIn] = useState(false)

  // Trying to get auth-token from local storage
  const token = JSON.parse(window.localStorage.getItem('loggedUser'))

  // Verifying token. In case if it's verified, logged-in state's value is changed to 'true'
  verifyToken(token, setLoggedIn)

  // Fetching initial data using auth-token. In case if token is missing, no data being loaded
  useEffect(() => {
    setInitData(token)
  }, [])

  return (
    
      <>
        <BackgroundSvg />
        <Container>
          <TransitionGroup>
          <CSSTransition timeout={300} classNames='fade-page' key={location.key}>
          <Switch location={location}>
            <Route exact path={'/'} component={ loggedIn && Object.keys(user).length !== 0 ? Dashboard : SignIn } />
            <PrivateRoute auth={loggedIn} path={'/training/today'} component={ TrainingToday } />
            <PrivateRoute auth={loggedIn} path={'/training/current_program'} component={ TrainingProgram } />
            <Route path={'/sign_up'} component={ SignUp } />
            <PrivateRoute auth={loggedIn} path={'/training/:day'} component={ TrainingDay } />
          </Switch>
          </CSSTransition>
          </TransitionGroup>
        </Container>
      </>
  );
}

export default App;
