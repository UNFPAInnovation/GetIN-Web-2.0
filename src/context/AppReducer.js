/* eslint-disable */
export default (state, action)=>{
    switch(action.type){
        case 'CURRENT_DISTRICT':
            return { ...state,district:action.payload}
        default:
            return state;
    }
}