import { SignInForm } from "../components/forms/signIn"
import { BrandTitle } from "../components/text/brandTitle"
import { useState } from "react"
import { login, setInitData } from "../actions/userActions"
import { useHistory } from "react-router-dom"
import { ErrorMessage } from "../components/messages/errorMessage"
import { CSSTransition } from "react-transition-group"

export const SignIn = () => {

    // Defining states for sign-in form
    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('') 

    // Defining states for error message
    const [error, setError] = useState('')
    const [showError, setShowError] = useState(false)

    const history = useHistory()

    // Function that shows error messages 
    // Firstly, it changes 'error'-state, then an error message is being shown for 3 seconds
    const toggleError = (error) => {
        setError(error)
        setShowError(true)
        setTimeout(() => {setShowError(false)}, 3000)
    }

    // Function handling sing-in process
    // Error message is being thrown, in case if incorrect data was inputted
    const handleSignIn = async event => {
        event.preventDefault()
        if (!(email && password)) {
            toggleError('One of required fields is blank')
            return false
        }
        const resLogin = await login({email, password})
         if (resLogin.success) {
            history.push('/')
         } else {
            toggleError(resLogin.message)
         }
    }

    return (
        <div className="sign-page">
            <BrandTitle />
            <SignInForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleSignIn={handleSignIn}/> 
            <CSSTransition in={showError} timeout={300} classNames="fade-bottom" unmountOnExit>
                <ErrorMessage error={error}/>
            </CSSTransition>    
        </div>
    )
}