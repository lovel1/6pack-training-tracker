import { SignInForm } from "../components/forms/signIn"
import { BrandTitle } from "../components/text/brandTitle"
import { useState } from "react"
import { login, setInitData } from "../actions/userActions"
import { useHistory } from "react-router-dom"

export const SignIn = () => {
    
    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('') 

    const history = useHistory()

    const handleSignIn = async event => {
        event.preventDefault()
        await login({email, password})
        history.push('/')
    }

    return (
        <div className="sign-page">
            <BrandTitle />
            <SignInForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleSignIn={handleSignIn}/>            
        </div>
    )
}