const appReducer = (state, action)=>{
    switch(action.type){
        case 'CURRENT_DISTRICT':
            return { ...state,district:action.payload}
        case 'SET_DISTRICT_ID':
            return { ...state,districtId:action.payload}
        case 'STATE_CHANGE':
            return { ...state,change:action.payload}
        case 'DATE_FROM_CHANGE':
            return { ...state,dateFrom:action.payload}
        case 'DATE_TO_CHANGE':
            return { ...state,dateTo:action.payload}
        default:
            return state;
    }
}

export default appReducer;