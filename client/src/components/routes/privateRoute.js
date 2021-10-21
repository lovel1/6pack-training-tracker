import { SignIn } from "../../pages/SignIn";
import { Route } from 'react-router-dom'


export const PrivateRoute = ({ auth, component, ...options }) => {
    const finalComponent = auth ? component : SignIn;
  
    return <Route {...options} component={finalComponent} />;
};