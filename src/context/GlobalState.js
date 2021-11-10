import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';
import {fromInitialDate,endOfDay} from '../utils/index';
import moment from 'moment';

const initialState = {
    district:'All Districts',
    districtId: '',
    change:false,
    dateFrom: fromInitialDate,
    dateTo: moment(endOfDay).local().format("YYYY-MM-DD")
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
        contextChange(true);
    }

    function updateDistrictId(id){
        disptach({
            type:'SET_DISTRICT_ID',
            payload: id
        })
        contextChange(true);
    }

    function contextChange(status){
        disptach({
            type:'STATE_CHANGE',
            payload: status
        })
    }

    function dateFromChange(value){
        disptach({
            type:'DATE_FROM_CHANGE',
            payload: value
        })
        contextChange(true);
    }

    function dateToChange(value){
        disptach({
            type:'DATE_TO_CHANGE',
            payload: value
        })
        contextChange(true);
    }

    return(
        <GlobalContext.Provider value={{
            district:state.district,
            districtId:state.districtId,
            change:state.change, 
            dateFrom:state.dateFrom,
            dateTo:state.dateTo,
            updateDistrict,
            updateDistrictId,
            contextChange,
            dateFromChange,
            dateToChange
            }}>
            {children}
        </GlobalContext.Provider>
    )
}

