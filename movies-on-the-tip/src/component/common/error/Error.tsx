import './Error.css';

type Props ={
    children: Error;
}

const ErrorDialog = ({children}: Props) => {
    return (
        <div className="errorContainer">
            <div className='error'>
                Error:&nbsp;{children.message}
            </div>
        </div>
    )
}

export default ErrorDialog;