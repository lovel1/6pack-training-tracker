import { Icon } from "@iconify/react";
import { editTrainingTheme } from "../../actions/userActions";

export const TrainingThemeEditor = ({show, theme, setTheme, day}) => {
    const handleSubmit = async event => {
        event.preventDefault()
        const token = JSON.parse(window.localStorage.getItem('loggedUser'))
        await editTrainingTheme(token, theme, day)
        show(false)
        setTheme('')
    }

    return (
        <div className="input-container shadow training-theme-editor">
            <div className="close-container">
                <button onClick={ () => {show(false); setTheme('')} }>
                    <Icon icon="ci:close-small" />
                </button>
            </div>

            <form onSubmit={handleSubmit} autoComplete="off">
                <div className="input-field-container">
                    <label>Training Theme</label>
                    <input value={theme} onChange={( {target} ) => setTheme(target.value)}></input>
                </div>

                <button className="btn-black-roundend submit-btn" type="submit">
                    <Icon icon="akar-icons:check" />
                </button>
            </form>
        </div>
    )
}