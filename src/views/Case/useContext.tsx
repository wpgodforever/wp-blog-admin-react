import { createContext } from "react"; 
import ContextChild from "./contextChild";

type contextTheme = {
    test: string | null
}

export const Context = createContext<contextTheme>({
    test: null 
});

const useContextCase = () => {
    return (
        <div>
            useContextCase
            <Context.Provider value={{
                test: '111'
            }}>
                <ContextChild />
            </Context.Provider>
        </div>
    )
}

export default useContextCase;