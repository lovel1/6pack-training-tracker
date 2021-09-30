import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { BackgroundSvg } from "./components/helpers/backgroungSvg";
import { Container } from "./components/layout/container";
import { UserState } from "./context/user/UserState";
import { Account } from "./pages/Account";
import { Dashboard } from "./pages/Dashboard";
import { TrainingDay } from "./pages/TrainingDay";
import { TrainingProgram } from "./pages/TrainingProgram";
import { TrainingToday } from "./pages/TrainingToday";

function App() {

  return (
    
    <UserState>
      <BrowserRouter>
      <BackgroundSvg />
      <Container>
        <Switch>
          <Route exact path={'/'} component={ Dashboard } />
          <Route path={'/training/today'} component={ TrainingToday } />
          <Route path={'/training/current_program'} component={ TrainingProgram } />
          <Route path={'/account'} component={ Account } />
          <Route path={'/training/:day'} component={ TrainingDay } />
        </Switch>
      </Container>
      </BrowserRouter>
    </UserState>
  );
}

export default App;
