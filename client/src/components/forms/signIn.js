import { Link } from "react-router-dom"

export const SignInForm = ({email, setEmail, password, setPassword, handleSignIn}) => {
    return (
        <div className="signin input-container shadow">
            <form onSubmit={handleSignIn} autoComplete="off">
                <div className="input-field-container">
                    <label>Email</label>
                    <input type="text" value={email} name="email" onChange={( {target} ) => setEmail(target.value)}/>
                </div>
                <div className="input-field-container">
                    <label>Password</label>
                    <input type="password" value={password} name="password" onChange={( {target} ) => setPassword(target.value)}/>
                </div>
                <button className="btn-black-roundend submit-btn" type="submit">
                    Sign In
                </button>
                <span>Don't have an account yet?<br/> <Link to="/sign_up">Sign Up</Link></span>
            </form>
        </div>
)}