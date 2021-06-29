const INITIAL_STATE = {
    user : {},
    token : null,
    loggedIn : false,
}

function rootReducer(state=INITIAL_STATE, action){
    switch (action.type){
        case 'LOGGED_IN' :
            return {...state, loggedIn : state.loggedIn = true}
        case 'LOGGING_OUT' :
            return {...state, loggedIn : state.loggedIn = false}
        case 'TOKEN_VALUE' :
            return {...state, token : state.token = action.payload}
        case 'USER':
            return {...state, user : state.user = action.payload}
        default:
            return state
    }
}


export default rootReducer;