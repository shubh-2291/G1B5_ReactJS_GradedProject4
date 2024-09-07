import {faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './DialogMessage.css';

type Props ={
    icon: any,
    iconColor?: string,
    iconSize?: number,
    messageTitle: string,
    message: string,
    cancelToggle: () => void

}

const DialogMessage = ({icon, messageTitle, message, cancelToggle, iconColor="green", iconSize}: Props) => {
    return (
        <div className="DialogContainer">
            <div className="icon" style={{color:iconColor, fontSize:iconSize}}>
                <FontAwesomeIcon icon={icon} />
            </div>
            <div className="message">
                <h3>{messageTitle}</h3>
                <p>{message}</p>
            </div>
            <div className="icon-cancel" onClick={cancelToggle}>
                <FontAwesomeIcon icon={faXmark} />
            </div>
        </div>
    )
}

export default DialogMessage;