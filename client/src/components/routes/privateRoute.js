import { SignIn } from "../../pages/SignIn";
import { Route } from 'react-router-dom'


export const PrivateRoute = ({ auth, component, ...options }) => {
    // Component that should be rendered is defined depending on the value of 'auth'- variable
    // SignIn-component is being loaded, in case 'auth' is false. Otherwise route's default component is loaded
    const finalComponent = auth ? component : SignIn
    return <Route {...options} component={finalComponent} />
};