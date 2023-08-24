import { useContext, useEffect } from "react";
import { alertContext } from "../context";

function CustomAlertBox() {

    const context = useContext(alertContext)

    useEffect(() => {
        if(!context.alertMessage && !context.alertMessage)return;

        const timer = setTimeout(() => {
            if(context.handleClearAlert){
                context.handleClearAlert()
            }
        }, 4000)

        return () => clearTimeout(timer)
        
    },[context.alertMessage,context.severity])

    return (
        context.alertMessage ?
        <div className={context.severity && context.alertMessage ? "alert" : "alert hide_alert"}>
            <p style={{backgroundColor: context.severity === "Error" ? "red" : "#008000be"}} role="alert">{context.alertMessage}</p>
        </div>
        :
        null
    )
}

export default CustomAlertBox;