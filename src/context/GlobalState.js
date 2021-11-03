import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';

const initialState = {
    district:'All Districts'
}

// create Context
export const GlobalContext = createContext(initialState);

// Context provider Component
export const GlobalProvider = ({children})=>{
    const [state, disptach] = useReducer(AppReducer,initialState)

    function updateDistrict(district){
        disptach({
            type:'CURRENT_DISTRICT',
            payload: district
        })
    }

    return(
        <GlobalContext.Provider value={{district:state.district, updateDistrict}}>
            {children}
        </GlobalContext.Provider>
    )
}

