import { Icon } from "@iconify/react";

export const ErrorMessage = ({error}) => (
    <div className='error-container shadow'>
        <div>
            {error && <Icon icon="iconoir:voice-error" className="error-icon"/>}
        </div>

        <div>
            <p className="error-text">{error}</p>
        </div>
    </div>
)