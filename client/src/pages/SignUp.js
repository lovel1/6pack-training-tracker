import { useState } from "react"
import { useHistory } from "react-router"
import { CSSTransition } from "react-transition-group"
import { signUp } from "../actions/userActions"
import { SignUpForm } from "../components/forms/signUp"
import { ErrorMessage } from "../components/messages/errorMessage"

export const SignUp = () => {

    // Initializing states for sign-up form
    const [email, setEmail] = useState('') 
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('') 
    const [confirmPassword, setConfirmPassword] = useState('') 

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

    // Function that checks if passwords match
    const passwordMatch = (pass, confPass) => pass === confPass ? true : false

    // Function that validates email format. Returns boolean value
    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Function handling sing-up process
    // Error message is being thrown, in case if incorrect data was inputted
    const handleSignUp = async event => {
        event.preventDefault()
        const passwordMatchResult = passwordMatch(password, confirmPassword)
        const validEmail = validateEmail(email) 

        // Data validation
        if (!validEmail) {
            toggleError('Wrong format of email')
            return false
        }
        if (!(password && email && username && confirmPassword)) {
            toggleError('One of required fields is blank')
            return false
        }
        if (!passwordMatchResult) {
            toggleError('Password fields do not match')
            return false
        }

        // Making a sign-up request to the server, assigning response to a variable
        const resSignUp = await signUp({email, username, password})
        if (resSignUp.success) {
            history.push('/')
         } else {
            toggleError(resSignUp.message)
         }
        
    }

    return (
        <div className="sign-page">
            <div className="brand-title vert-m-1">
                <h1>6Pack</h1>
                <span>Training plan tracker</span>
            </div>
            <SignUpForm email={email} setEmail={setEmail}
                        username={username} setUsername={setUsername} 
                        password={password} setPassword={setPassword} 
                        confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} 
                        handleSignUp={handleSignUp}
            /> 

            <CSSTransition in={showError} timeout={300} classNames="fade-bottom" unmountOnExit>
                <ErrorMessage error={error}/>
            </CSSTransition>   
        </div>
    )
}