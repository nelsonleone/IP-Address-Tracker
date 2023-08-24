import { ReactNode, createContext, useReducer } from "react"

interface IAlertValue {
    alertMessage: string,
    severity: "Error" | "Success" | ""
}

interface IAlertAction {
    type: "SET_ALERT"|"CLEAR_ALERT";
    payload: IAlertValue;
}

interface IContextStateValue extends IAlertValue {
  handleSetAlert?: (setAlertProps:IAlertValue) => void,
  handleClearAlert?: () => void,
}

export const alertContext = createContext<IContextStateValue>({
    alertMessage: "",
    severity: ""}
)

const defaultAlertValue: IAlertValue = {
    alertMessage: "",
    severity: ""
}

const reducer = (state: IAlertValue, action: IAlertAction) => {
    switch (action.type) {
        case "SET_ALERT":
            return action.payload;
        case "CLEAR_ALERT":
            return defaultAlertValue;
        default:
            return state;
    }
}

const { Provider } = alertContext;

export default function AlertContextProvider({ children }: { children: ReactNode }) {

    const [state, dispatch] = useReducer(reducer, defaultAlertValue)

    const handleSetAlert = (setAlertProps:IAlertValue) => {
        dispatch({
            type: "SET_ALERT",
            payload: setAlertProps
        })
    }

    const handleClearAlert = () => {
        dispatch({
            type: "CLEAR_ALERT",
            payload: {
                alertMessage: "",
                severity: ""
            }
        })
    }

    return (
        <Provider value={{
            ...state,
            handleClearAlert,
            handleSetAlert
        }}>
            {children}
        </Provider>
    )
}
