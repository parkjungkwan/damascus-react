const LoginReducer = (state={}, action={}) => {

    switch(action.type){
        case 'LOGIN':
            console.log(`로그인 진입`)
            state.authSeq = action.authSeq
            state.authId = action.authId
            state.authType = action.authType
            return {
                authSeq: state.authSeq, 
                authId: state.authId, 
                authType: state.authType
            }
        case 'LOGOUT':
            state.authSeq = null
            state.authId = null
            state.authType = null
            return {
                authSeq: state.authSeq, 
                authId: state.authId, 
                authType: state.authType
            }
        default:
            return {...state}
    }
}

export default LoginReducer