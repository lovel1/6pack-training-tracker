import { SignUpForm } from "../components/forms/signUp"

export const SignUp = () => {

    return (
        <div className="sign-page">
            <div className="brand-title vert-m-1">
                <h1>6Pack</h1>
                <span>Training plan tracker</span>
            </div>
            <SignUpForm /> 
        </div>
    )
}