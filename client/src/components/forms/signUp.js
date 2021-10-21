import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router"
import { signUp } from "../../actions/userActions";


export const SignUpForm = () => {

    const [email, setEmail] = useState('') 
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('') 
    const [confirmPassword, setConfirmPassword] = useState('') 
    const history = useHistory()

    const passwordMatch = (pass, confPass) => pass === confPass ? true : false

    const handleSignUp = async event => {
        event.preventDefault()
        const passwordMatchResult = passwordMatch(password, confirmPassword)
        if (!passwordMatchResult) return null
        await signUp({email, username, password})
        history.push('/')
        
    }

    return (
        <div className="signup input-container shadow">
            <form onSubmit={handleSignUp}>
                <div className="input-field-container">
                    <label>Email</label>
                    <input type="text" value={email} name="email" onChange={( {target} ) => setEmail(target.value)}/>
                </div>
                <div className="input-field-container">
                    <label>First Name</label>
                    <input type="text" value={username} name="name" onChange={( {target} ) => setUsername(target.value)}/>
                </div>
                <div className="input-field-container">
                    <label>Password</label>
                    <input type="password" value={password} name="password" onChange={( {target} ) => setPassword(target.value)}/>
                </div>
                <div className="input-field-container">
                    <label>Confirm Password</label>
                    <input type="password" value={confirmPassword} name="confirmPassword" onChange={( {target} ) => setConfirmPassword(target.value)}/>
                </div>
                <button className="btn-black-roundend submit-btn" type="submit">
                    Sign Up
                </button>
                <span>Already have an account?<br/> <Link to="/">Sign In</Link></span>
            </form>
        </div>
    )
}