
import JoblyApi from '../API/api'

export function getUserProfile(username){
    return async function(dispatch){
        const userData = await JoblyApi.findUser(username)
        dispatch({ type : 'USER', payload : userData})
    }
}

